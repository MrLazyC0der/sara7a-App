import { Router } from "express";
import * as userService from "./user.service.js";
import { authentication } from "../../Middleware/auth.middleware.js";
import { TokenEnum } from "../../Utils/Enums/user.enum.js";
import { authorization } from "../../Middleware/authorization.js";
import { RoleEnum } from "../../Utils/Enums/user.enum.js";
import { localFileUploader } from "../../Multer/local.multer.js";
import * as userValidation from "./user.validation.js";
import { validationMiddleware } from "../../Middleware/validation.middleware.js";
import { validateMagicNumber } from "../../Middleware/magicNumber.middleware.js";
const router = Router();

router.get("/",
    authentication({ tokenType: TokenEnum.AccessToken }),
    authorization(RoleEnum.Admin),
    userService.getUserById
);
router.patch("/profile-image",
    authentication({ tokenType: TokenEnum.AccessToken }),
    authorization(RoleEnum.User),
    localFileUploader({ customPath: "users" }).single("profileImage"),
    validateMagicNumber,
    validationMiddleware(userValidation.uploadProfileImageSchema),
    userService.uploadProfileImage
);
router.patch("/update-password",
    authentication({ tokenType: TokenEnum.AccessToken }),
    authorization(RoleEnum.User, RoleEnum.Admin),
    validationMiddleware(userValidation.updatePasswordSchema),
    userService.updatePassword
);
router.delete("{/:userId}/freeze-account",
    authentication({ tokenType: TokenEnum.AccessToken }),
    authorization(RoleEnum.Admin, RoleEnum.User),
    validationMiddleware(userValidation.validationUserIdFromParams),
    userService.freezeAccount
);
router.patch("/:userId/unfreeze-account-by-admin",
    authentication({ tokenType: TokenEnum.AccessToken }),
    authorization(RoleEnum.Admin),
    validationMiddleware(userValidation.unfreezeAccountByAdminSchema),
    userService.unfreezeAccountByAdmin
);
router.patch("/unfreeze-account-by-user",
    authentication({ tokenType: TokenEnum.AccessToken }),
    authorization(RoleEnum.User),
    validationMiddleware(userValidation.unfreezeAccountByUserSchema),
    userService.unfreezeAccountByUser
);
router.delete("/:userId/hard-delete",
    authentication({ tokenType: TokenEnum.AccessToken }),
    authorization(RoleEnum.Admin),
    validationMiddleware(userValidation.validationUserIdFromParams),
    userService.hardDeleteUser
);


export default router;