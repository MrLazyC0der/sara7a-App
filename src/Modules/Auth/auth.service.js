import { create, findOne, findOneAndUpdate, updateOne } from "../../DB/database.repository.js";
import { UserModel } from "../../DB/Models/user.model.js";
import { ConflictError, ServerError, UnAuthorizedError, NotFoundError, BadRequestError } from "../../Utils/Errors/error.helpers.js";
import { successResponse } from "../../Utils/Res/success.res.js";
import { encrypt } from "../../Utils/Security/encrytpion.security.js";
import { compareHash, genereteHash } from "../../Utils/Security/hash.security.js";
import { decrypt } from "../../Utils/Security/encrytpion.security.js";
import { getNewLoginCredentials } from "../../Utils/Security/token.js";
import { verifyGoogleToken } from "../../DB/Models/Providers/google.provider.js";
import { ProviderEnum, RoleEnum } from "../../Utils/Enums/user.enum.js";
//revokeTokenKey
import { revokeTokenKey, set } from "../../DB/Redis/redis.repository.js";
import { generateOTP } from "../../Utils/generateOTP.js";

import { emailEvent } from "../../Utils/Events/email.event.js";
import { ACCESS_EXPIRE } from "../../../config/config.service.js";
import { LogoutTypeEnum } from "../../Utils/Enums/token.enum.js";


export const signup = async (req, res) => {
    // destructure the request body
    const { firstName, lastName, email, password, phone, gender } = req.body;
    // check if the user already exists
    if (await findOne({ model: UserModel, filter: { email } }))
        throw ConflictError({ message: "User already exists", statusCode: 400, })
    // generate hash password
    const hashPassword = await genereteHash({ plainText: password });
    // encrypt phone number
    const encryptedPhone = await encrypt(phone);
    // generate otp
    const otp = generateOTP();
    //hash otp
    const hashOtp = await genereteHash({ plainText: JSON.stringify(otp) });
    // create the user
    const user = await create({
        model: UserModel,
        document: {
            firstName,
            lastName,
            email,
            password: hashPassword,
            phone: encryptedPhone,
            gender,
            role: RoleEnum.User,
            provider: ProviderEnum.System,
            otp: hashOtp,
        }
    });




    // send otp to user email
    emailEvent.emit("confirmEmailMail", {
        to: email,
        otp,
        firstName,
    });
    // check if the user was created
    if (!user) throw ServerError({ message: "User not created", statusCode: 500, })
    // otp varify email 

    // return the user
    return successResponse({ res, message: "User created successfully", statusCode: 201, data: user });
}

export const signin = async (req, res) => {
    // destructure the request body
    const { email, password } = req.body;
    // email lower case
    console.log(`email: ${email}, password: ${password}`);
    // check if the user exists and his freezed
    const user = await findOne({
        model: UserModel, filter: {
            email,
            confirmEmail: { $exists: true },
            freezedAt: { $exists: false },
        }
    });

    // check if the user exists
    if (!user) throw NotFoundError({ message: "User not found " })
    // check if the user is from system
    if (user.provider !== ProviderEnum.System) {
        throw UnAuthorizedError({ message: "Please login using Google" });
    }
    // compare the password
    const isMatch = await compareHash({ plainText: password, hashText: user.password });
    if (!isMatch) throw UnAuthorizedError({ message: "Invalid password" })
    // send login email



    // decrypt phone number
    user.phone = await decrypt(user.phone);
    // create access token and refresh token
    const { accessToken, refreshToken } = await getNewLoginCredentials(user);
    // return token
    successResponse({ res, statusCode: 200, message: "User logged in successfully", data: { accessToken, refreshToken } });

    emailEvent.emit("loginMail", {
        to: email,
        firstName: user.firstName,
        time: new Date().toLocaleString(),
    });
}
export const refreshToken = async (req, res) => {
    const user = req.user;
    // create new token
    const { accessToken, refreshToken } = await getNewLoginCredentials(user);
    // return token
    return successResponse({ res, statusCode: 200, message: "Token refreshed successfully", data: { accessToken, refreshToken } });
}
export const loginWithGoogle = async (req, res) => {
    let newUser = false;
    // destructure the request body
    const { idToken } = req.body;
    // verify the token
    const payload = await verifyGoogleToken({ idToken });
    // destructure the payload
    const { email, given_name, family_name } = payload;
    // email lower case
    cons = email.toLowerCase().trim();
    // check Invalid email
    if (!email) throw UnAuthorizedError({ message: "Invalid Google token" })
    // fallback names
    const firstName = given_name || "User";
    const lastName = family_name || `Google ${email.split("@")[1]}`;
    // check if the user exists
    let user = await findOne({ model: UserModel, filter: { email } });
    // check if the user is from google
    if (user && user.provider !== ProviderEnum.Google) {
        throw UnAuthorizedError({ message: "Please login using email & password" });
    }
    // if the user does not exist
    if (!user) {
        newUser = true;
        user = await create({
            model: UserModel,
            document: {
                email,
                firstName,
                lastName,
                provider: ProviderEnum.Google
            }
        });
    }

    const { accessToken, refreshToken } = await getNewLoginCredentials(user);

    return successResponse({
        res,
        statusCode: newUser ? 201 : 200,
        message: newUser ? "User created successfully" : "User logged in successfully",
        data: { accessToken, refreshToken }
    });

};
export const confirmEmailAndLogin = async (req, res) => {
    const { email, otp } = req.body;
    // check if the user exists
    const user = await findOne({
        model: UserModel,
        filter: {
            email,

            confirmEmail: null,
            otp: { $exists: true }
        }
    });
    // check if the user exists
    if (!user) throw NotFoundError({ message: "User not found" })
    // check if the user is from system
    if (user.provider !== ProviderEnum.System) {
        throw UnAuthorizedError({ message: "Please login using Google" });
    }
    // compare the password
    const isOtpMatch = await compareHash({ plainText: otp, hashText: user.otp });
    if (!isOtpMatch) throw UnAuthorizedError({ message: "Invalid OTP" })
    // update user 
    await updateOne({
        model: UserModel,
        filter: { email },
        update: {

            confirmEmail: Date.now(),
            otp: null
        }
    });
    emailEvent.emit("createAccountMail", {
        to: user.email,
        firstName: user.firstName,
    });
    // create access token and refresh token
    const { accessToken, refreshToken } = await getNewLoginCredentials(user);
    // return token
    return successResponse({ res, statusCode: 200, message: "User logged in successfully", data: { accessToken, refreshToken } });
}
export const forgetPassword = async (req, res) => {
    const { email } = req.body;
    // generate otp
    const otp = generateOTP();
    //hash otp
    const hashOtp = await genereteHash({ plainText: JSON.stringify(otp) });
    //get user and  update
    const user = await findOneAndUpdate({
        model: UserModel,
        filter: {
            email,
            confirmEmail: { $exists: true },
            provider: ProviderEnum.System,
        },
        update: {
            forgetPasswordOTP: hashOtp,

        }
    });
    //check if user not found
    if (!user) throw NotFoundError({ message: "User not found" })
    // send otp to user email
    emailEvent.emit("forgetPasswordMail", {
        to: email,
        otp,
        firstName: user.firstName,
    });
    // return the user
    return successResponse({ res, message: "OTP sent successfully", statusCode: 200 });
}
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    // check if the user exists
    const user = await findOne({
        model: UserModel,
        filter: {
            email,
            confirmEmail: { $exists: true },
            provider: ProviderEnum.System,
            forgetPasswordOTP: { $exists: true }
        }
    });
    //check if user not found
    if (!user) throw NotFoundError({ message: "User not found" })
    // compare the password
    const isOtpMatch = await compareHash({ plainText: otp, hashText: user.forgetPasswordOTP });
    if (!isOtpMatch) throw UnAuthorizedError({ message: "Invalid OTP" })
    // hash new password
    const hashNewPassword = await genereteHash({ plainText: newPassword });
    // update user 
    await updateOne({
        model: UserModel,
        filter: { email },
        update: {
            password: hashNewPassword,
            forgetPasswordOTP: null
        }
    });
    emailEvent.emit("passwordResetSuccessMail", {
        to: email,
        firstName: user.firstName,
        time: new Date().toLocaleString(),
    });
    // return the user
    return successResponse({ res, message: "Password reset successfully", statusCode: 200 });
}
export const logout = async (req, res) => {
    const { flag } = req.body;
    let status = 200;
    switch (flag) {
        case LogoutTypeEnum.softLogout:
            const remainingTTL = req.decodedToken.exp - Math.floor(Date.now() / 1000);
            await set({
                key: revokeTokenKey({ userId: req.user._id, jti: req.decodedToken.jti }),
                value: req.decodedToken.jti,
                ttl: remainingTTL
            });
            status = 201;
            break;
        case LogoutTypeEnum.hardLogout:
            await updateOne({
                model: UserModel,
                filter: { _id: req.user._id },
                update: { changeCredentialsAt: new Date() }
            });
            status = 200;
            break;
        default:
            status = 200;
            break;
    }
    return successResponse({ res, message: "User logged out successfully", statusCode: status });
}