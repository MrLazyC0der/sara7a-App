
import { deleteOne, findByIdAndUpdate, findOne, findOneAndUpdate } from "../../DB/database.repository.js";
import { UserModel } from "../../DB/Models/user.model.js";
import { ProviderEnum, RoleEnum } from "../../Utils/Enums/user.enum.js";
import { BadRequestError, ForbiddenError } from "../../Utils/Errors/error.helpers.js";
import { emailEvent } from "../../Utils/Events/email.event.js";
import { ErrorResponse } from "../../Utils/Res/error.res.js";
import { successResponse } from "../../Utils/Res/success.res.js";
import { decrypt } from "../../Utils/Security/encrytpion.security.js";
import { compareHash, genereteHash } from "../../Utils/Security/hash.security.js";



export const getUserById = async (req, res) => {
    const { id } = req.body;
    // populate messagesReceived and messagesSent
    const user = await findOne({ model: UserModel, filter: { _id: id, confirmEmail: { $exists: true, $ne: null } } , options: { populate: "messagesReceived messagesSent" } });
    if (!user) {
        return ErrorResponse({ res, statusCode: 404, message: "User not found" });
    }
    if (user.phone) {
        user.phone = await decrypt(user.phone);
    }

    return successResponse({ res, statusCode: 200, message: "User found successfully", data: user });
}
export const uploadProfileImage = async (req, res) => {
    const user = await findByIdAndUpdate({ model: UserModel, id: req.user._id, update: { profileImage: req.file.finalFilePath } });

    if (!user) {
        return errorResponse({ res, statusCode: 404, message: "User not found" });
    }
    return successResponse({ res, statusCode: 200, message: "Profile image uploaded successfully", data: { user } });
}
export const updatePassword = async (req, res) => {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    if (newPassword !== confirmNewPassword) {
        throw BadRequestError({ message: "Passwords do not match" });
    }

    const user = await findOne({
        model: UserModel,
        filter: {
            _id: req.user._id,
            provider: ProviderEnum.System
        }
    });

    if (!user) {
        throw BadRequestError({
            message: "This account uses social login. Password cannot be updated."
        });
    }

    const isPasswordValid = await compareHash({
        plainText: oldPassword,
        hashText: user.password
    });
    if (!isPasswordValid) {
        throw BadRequestError({ message: "Invalid password" });
    }

    const hashedNewPassword = await genereteHash({ plainText: newPassword });
    await findByIdAndUpdate({
        model: UserModel,
        id: req.user._id,
        update: {
            password: hashedNewPassword,
            passwordChangedAt: Date.now()
        }
    });

    return successResponse({
        res,
        statusCode: 200,
        message: "Password updated successfully"
    });
};
export const freezeAccount = async (req, res) => {
    const { userId } = req.params;
    // check user or a  dmin 
    if (userId && req.user.role !== RoleEnum.Admin) throw ForbiddenError({ message: "You are not authorized to freeze this account" });

    const updatedUser = await findOneAndUpdate({
        model: UserModel,
        filter: { _id: userId || req.user._id, confirmEmail: { $exists: true }, freezedAt: { $in: [null, undefined] } },
        update: {
            freezedAt: Date.now(),
            freezedBy: req.user._id,
            $unset: {
                unfreezedAt: true,
                unfreezedBy: true
            }
        }
    });
    if (!updatedUser) {
        return ErrorResponse({ res, statusCode: 404, message: "User not found" });
    }
    emailEvent.emit("accountFreezedMail", {
        to: updatedUser.email,
        firstName: updatedUser.firstName,
        time: updatedUser.freezedAt,
        freezedBy: req.user.role === RoleEnum.Admin ? "Admin" : "You"
    });
    return successResponse({ res, statusCode: 200, message: "User frozen successfully", data: { updatedUser } });
}
export const unfreezeAccountByAdmin = async (req, res) => {
    const { userId } = req.params;
    // check user or a  dmin 

    const updatedUser = await findOneAndUpdate({
        model: UserModel,
        filter: {
            _id: userId,
            confirmEmail: { $exists: true },
            freezedAt: { $exists: true },
            freezedBy: { $ne : userId }
        },
        update: {
            unfreezedAt: Date.now(),
            unfreezedBy: req.user._id,
            $unset: {
                freezedAt: true,
                freezedBy: true
            }
        }
    });
    if (!updatedUser) {
        return ErrorResponse({ res, statusCode: 404, message: "User not found" });
    }
    emailEvent.emit("unfreezeAccountByAdminMail", {
        to: updatedUser.email,
        firstName: updatedUser.firstName,
        time: new Date().toISOString(),
        freezedBy: req.user.role === RoleEnum.Admin ? "Admin" : "You"
    });
    return successResponse({ res, statusCode: 200, message: "User unfrozen successfully", data: { updatedUser } });
}
export const unfreezeAccountByUser = async (req, res) => {
    const userId = req.user._id;

    const updatedUser = await findOneAndUpdate({
        model: UserModel,
        filter: {
            _id: userId,
            confirmEmail: { $exists: true },
            freezedAt: { $exists: true },
            freezedBy: userId          
        },
        update: {
            unfreezedAt: Date.now(),
            unfreezedBy: userId,       
            $unset: {
                freezedAt: true,
                freezedBy: true
            }
        }
    });

    if (!updatedUser) {
        return ErrorResponse({ res, statusCode: 404, message: "User not found" });
    }

    successResponse({ res, statusCode: 200, message: "User unfrozen successfully", data: { updatedUser } });
    
    emailEvent.emit("unfreezeAccountByUserMail", {
        to: updatedUser.email,
        firstName: updatedUser.firstName,
        time: new Date().toISOString(),
        freezedBy: "You"
    });
};
export const hardDeleteUser = async (req, res) => {
    const { userId } = req.params;
    const user = await deleteOne({ model: UserModel, filter: { _id: userId } });
    if (user.deletedCount === 0) {
        return ErrorResponse({ res, statusCode: 404, message: "User not found , check user id" });
    }
    emailEvent.emit("adminHardDeleteUserMail", {
        to: req.user.email,
        adminName: req.user.firstName,
        userId,
        deletedAt: new Date().toISOString(),
    });
    return successResponse({ res, statusCode: 200, message: "User deleted successfully", data: { user } });
}

