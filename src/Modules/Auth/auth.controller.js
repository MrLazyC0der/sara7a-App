import { Router } from "express";
import * as authService from "./auth.service.js";
import { authentication } from "../../Middleware/auth.middleware.js";
import { TokenEnum } from "../../Utils/Enums/user.enum.js";
import { validationMiddleware } from "../../Middleware/validation.middleware.js";
import * as authValidation from "./auth.validation.js";

const router = Router();

router.post("/signup", validationMiddleware(authValidation.signupUserSchema), authService.signup);
router.post("/signin", validationMiddleware(authValidation.signinUserSchema), authService.signin);
router.post("/refresh-token", authentication({ tokenType: TokenEnum.RefreshToken }), authService.refreshToken);
router.post("/social-login", authService.loginWithGoogle);
router.post("/confirm-email", authService.confirmEmailAndLogin);
router.post("/forget-password", validationMiddleware(authValidation.emailOnlySchema), authService.forgetPassword);
router.post("/reset-password", validationMiddleware(authValidation.resetPasswordSchema), authService.resetPassword);
router.post("/logout", authentication({ tokenType: TokenEnum.AccessToken }), authService.logout);


export default router;