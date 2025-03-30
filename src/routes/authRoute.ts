import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { validateUserInput } from "../middleware/validateUserInput";
import { handleInputErrors } from "../middleware/handleInputErrors";
import { validateEmailInput } from "../middleware/validateEmailInput";
import { validateTokenInput } from "../middleware/validateTokenInput";
import { validateLoginInput } from "../middleware/validateLoginInput";
import { validateUpdatePasswordInput } from "../middleware/validateUpdatePasswordInput";
import { validateToken } from "../middleware/validateId";
import { authenticate } from "../middleware/auth";
import { validateProfileInput } from "../middleware/validateProfileInput";
import { validateChangePasswordInput } from "../middleware/validateChanegePasswordInput";

const router = Router();

router.post(
  "/create-account",
  validateUserInput,
  handleInputErrors,
  AuthController.createAccount
);

router.post(
  "/confirm-account",
  validateTokenInput,
  handleInputErrors,
  AuthController.confirmAccount
);

router.post(
  "/login",
  validateLoginInput,
  handleInputErrors,
  AuthController.login
);

router.post(
  "/request-token",
  validateEmailInput,
  handleInputErrors,
  AuthController.requestConfirmationCode
);

router.post(
  "/forgot-password",
  validateEmailInput,
  handleInputErrors,
  AuthController.forgotPassword
);

router.post(
  "/validate-token",
  validateTokenInput,
  handleInputErrors,
  AuthController.validateToken
);

router.post(
  "/update-password/:token",
  validateToken,
  validateUpdatePasswordInput,
  handleInputErrors,
  AuthController.updatePasswordWithToken
);

router.get("/user", authenticate, AuthController.user);

/** Profile **/

router.put(
  "/profile",
  authenticate,
  validateProfileInput,
  handleInputErrors,
  AuthController.updateProfile
);

router.put(
  "/update-password",
  authenticate,
  validateChangePasswordInput,
  handleInputErrors,
  AuthController.updateCurrentUserPassword
);

export default router;
