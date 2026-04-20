import joi from "joi";
import { GenderEnum, RoleEnum, ProviderEnum } from "../../Utils/Enums/user.enum.js";
import { generalFields } from "../../Utils/Validation/user.generalFields.js";

export const signupUserSchema = {
    body: joi.object({
        firstName: generalFields.firstName.required(),
        lastName: generalFields.lastName.required(),
        email: generalFields.email.required(),
        password: generalFields.password.required(),
        phone: generalFields.phone.required(),
        gender: generalFields.gender.required(),
        role: generalFields.role.required(),
        provider: generalFields.provider.required(),

    })
}
export const signinUserSchema = {
    body: joi.object({
        email: generalFields.email.required(),
        password: generalFields.password.required(),
    })
}
export const emailOnlySchema = {
    body: joi.object({
        email: generalFields.email.required(),
    })
} 
export const confirmEmailSchema = {
    body: joi.object({
        email: generalFields.email.required(),
        otp: generalFields.otp.required(),
    })
}
export const resetPasswordSchema = {
    body: joi.object({
        email: generalFields.email.required(),
        otp: generalFields.otp.required(),
        newPassword: generalFields.newPassword.required(),
        confirmNewPassword: generalFields.confirmNewPassword,
    })
}
