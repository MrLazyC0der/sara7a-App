import joi from "joi";
import { generalFields } from "../../Utils/Validation/user.generalFields.js";
export const updatePasswordSchema = {
    body: joi.object({
        oldPassword: generalFields.password.required(),
        newPassword: generalFields.newPassword.required(),
        confirmNewPassword: generalFields.confirmNewPassword
    })
};
export const validationUserIdFromParams = {
    params: joi.object({
        userId: generalFields.id,
    })
};
export const unfreezeAccountByAdminSchema = {
    params: joi.object({
        userId: generalFields.id,
    })
};
export const unfreezeAccountByUserSchema = {
    params: joi.object({
        userId: generalFields.id,
    })
};
export const uploadProfileImageSchema = {
    file: joi.object({
        mimetype: joi.string()
            .valid("image/jpeg", "image/png", "image/webp", "image/gif")
            .required()
            .messages({
                "any.only": "Only images are allowed (jpeg, png, webp, gif)",
                "any.required": "Profile image is required",
            }),
        size: joi.number()
            .max(5 * 1024 * 1024)
            .required()
            .messages({
                "number.max": "File size must be less than 5MB",
            }),
    })
    .unknown(true) // ✅ يسمح بالـ fields التانية (path, filename, destination...)
    .required()
    .messages({
        "any.required": "Profile image is required",
    }),
};