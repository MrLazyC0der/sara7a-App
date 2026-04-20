import joi from "joi";
import { GenderEnum, RoleEnum, ProviderEnum } from "../../Utils/Enums/user.enum.js";
import { generalFields } from "../../Utils/Validation/user.generalFields.js";

export const sendMessageValidation = {
    params: joi.object({
        receiverId: generalFields.id.required(),
    }),
    body: joi.object({
        content: generalFields.contentMessage.required(),
    }),
}
//getMessageValidation
export const getMessageValidation = {
    params: joi.object({
        messageId: generalFields.id.required(),
    }),
}
//validationUserIdFromParams
export const validationUserIdFromParams={
    params: joi.object({
        receiverId: generalFields.id,
    }),
}
