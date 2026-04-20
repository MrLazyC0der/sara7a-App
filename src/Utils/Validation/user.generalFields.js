import joi from "joi";
import { GenderEnum, RoleEnum, ProviderEnum } from "../Enums/user.enum.js";
export const generalFields = {
    id: joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .messages({
            "string.pattern.base": "Invalid ID format",
        }),
    firstName: joi.string()
        .min(2)
        .max(20)
        .trim()
        .messages({
            "any.required": "First name is required",
            "string.empty": "First name cannot be empty",
            "string.min": "First name must be at least 2 characters",
            "string.max": "First name must be at most 20 characters",
        }),

    lastName: joi.string()
        .min(2)
        .max(20)
        .messages({
            "any.required": "Last name is required",
            "string.empty": "Last name cannot be empty",
            "string.min": "Last name must be at least 2 characters",
            "string.max": "Last name must be at most 20 characters",
        }),

    email: joi.string()
        .email()
        .trim()
        .lowercase()
        .messages({
            "any.required": "Email is required",
            "string.empty": "Email cannot be empty",
            "string.email": "Please enter a valid email address",
        }),

    password: joi.string()
        .min(6)
        .when("provider", {
            is: ProviderEnum.System,
            then: joi.required(),
            otherwise: joi.optional()
        })
        .messages({
            "any.required": "Password is required",
            "string.empty": "Password cannot be empty",
            "string.min": "Password must be at least 6 characters",
        }),
    confirmPassword: joi.string()
        .valid(joi.ref("password"))
        .required()
        .messages({
            "any.required": "Confirm password is required",
            "any.only": "Passwords do not match",
        }),
    newPassword: joi.string()
        .min(6)
        .messages({
            "any.required": "Password is required",
            "string.empty": "Password cannot be empty",
            "string.min": "Password must be at least 6 characters",
        }),
    confirmNewPassword: joi.string()
        .valid(joi.ref("newPassword"))
        .messages({
            "any.required": "Confirm password is required",
            "any.only": "Passwords do not match",
        }),

    phone: joi.string()
        .pattern(/^(?:\+20|0)?1[0125][0-9]{8}$/)
        .messages({
            "string.empty": "Phone number is required",
            "string.pattern.base": "Invalid Egyptian phone number format",
        }),

    gender: joi.number()
        .valid(...Object.values(GenderEnum))
        .default(GenderEnum.Male),

    role: joi.number()
        .valid(...Object.values(RoleEnum))
        .default(RoleEnum.User),

    provider: joi.number()
        .valid(...Object.values(ProviderEnum))
        .default(ProviderEnum.System),
    otp: joi.string()
        .length(6)
        .pattern(/^[0-9]+$/)
        .required()
        .messages({
            "any.required": "OTP is required",
            "string.empty": "OTP cannot be empty",
            "string.length": "OTP must be exactly 6 digits",
            "string.pattern.base": "OTP must contain only numbers",
        }),
    contentMessage: joi.string()
        .min(2)
        .max(500)
        .required()
        .messages({
            "any.required": "Content is required",
            "string.empty": "Content cannot be empty",
            "string.min": "Content must be at least 2 characters",
            "string.max": "Content must be at most 500 characters",
        }),
    file: joi.object({
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        mimetype: joi.string()
            .valid("image/jpeg", "image/png", "image/webp", "image/gif")
            .required()
            .messages({
                "any.only": "Only images are allowed (jpeg, png, webp, gif)",
                "any.required": "File is required",
            }),
        size: joi.number()
            .max(5 * 1024 * 1024) // 5MB
            .required()
            .messages({
                "number.max": "File size must be less than 5MB",
            }),
    }).required().messages({
        "any.required": "Profile image is required",
    }),
}
