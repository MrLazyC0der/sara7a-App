import { Router } from "express";
import * as messageService from "./message.service.js"
import * as messageValidation from "./message.validation.js"
import { validationMiddleware } from "../../Middleware/validation.middleware.js";
import { RoleEnum, TokenEnum } from "../../Utils/Enums/user.enum.js";
import { authorization } from "../../Middleware/authorization.js";
import { authentication } from "../../Middleware/auth.middleware.js";
const router = Router();
// send message
router.post("/:receiverId/message",
    validationMiddleware(messageValidation.sendMessageValidation),
    messageService.sendMessage
);
router.get("/:messageId/message",
    validationMiddleware(messageValidation.getMessageValidation),
    messageService.getMessagesById
);
// admin get all message in database  option to get message for specific user
router.get("/all-messages{/:receiverId}",
    authentication({ tokenType: TokenEnum.AccessToken }),
    authorization(RoleEnum.Admin),
    validationMiddleware(messageValidation.validationUserIdFromParams),
    messageService.getAllMessagesByAdmin
);
// user messages
router.get("/user-messages",
    authentication({ tokenType: TokenEnum.AccessToken }),
    authorization(RoleEnum.User),
    messageService.getUserMessages
);

export default router;