// import 
import { RoleEnum, SignatureLevelEnum } from "../Enums/user.enum.js";
import jwt from "jsonwebtoken";
import { ACCESS_ADMIN_SECRET_KEY, REFRESH_ADMIN_SECRET_KEY, ACCESS_USER_SECRET_KEY, REFRESH_USER_SECRET_KEY, ACCESS_EXPIRE, REFRESH_EXPIRE } from "../../../config/config.service.js";
import { BadRequestError } from "../Errors/error.helpers.js";
import { v4 as uuidv4 } from "uuid";



export const generateToken = ({ payload, secretKey, options = { expiresIn: ACCESS_EXPIRE } }) => {
    const jwtId = uuidv4();
    const defaultOptions = { issuer: "sara7a.com | SWE Abdallah", jwtid: jwtId };
    try {
        return jwt.sign(payload, secretKey, { ...defaultOptions, ...options });
    } catch (error) {
        throw BadRequestError({ message: "Invalid token type , please choose correct type of token  " });
    }
}
export const verifyToken = async ({ token, secretKey }) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw BadRequestError({ message: "Token expired, please login again" });
        }
        if (error.name === "JsonWebTokenError") {
            throw BadRequestError({ message: "Invalid token signature" });
        }
        throw BadRequestError({ message: "Token verification failed" });
    }
}

// signature 
export const getSignature = async ({ signatureLevel = SignatureLevelEnum.User }) => {
    let signature = { accessSignature: undefined, refreshSignature: undefined };
    switch (signatureLevel) {
        case SignatureLevelEnum.Admin:
            signature.accessSignature = ACCESS_ADMIN_SECRET_KEY;
            signature.refreshSignature = REFRESH_ADMIN_SECRET_KEY;
            break;
        case SignatureLevelEnum.User:
            signature.accessSignature = ACCESS_USER_SECRET_KEY;
            signature.refreshSignature = REFRESH_USER_SECRET_KEY;
            break;
        default:
            signature.accessSignature = ACCESS_USER_SECRET_KEY;
            signature.refreshSignature = REFRESH_USER_SECRET_KEY;
            break;
    }

    return signature;
}


export const getNewLoginCredentials = async (user) => {
    const { id, role, email } = user;
    const payload = { id, role, email };
    const signature = await getSignature({ signatureLevel: role !== RoleEnum.Admin ? SignatureLevelEnum.User : SignatureLevelEnum.Admin });
    const accessToken = generateToken({ payload, secretKey: signature.accessSignature, options: { expiresIn: ACCESS_EXPIRE } });
    const refreshToken = generateToken({ payload, secretKey: signature.refreshSignature, options: { expiresIn: REFRESH_EXPIRE } });
    return { accessToken, refreshToken };
} 