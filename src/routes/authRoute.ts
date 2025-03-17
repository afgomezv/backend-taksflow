import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { validateUserInput } from "../middleware/validateUserInput";
import { handleInputErrors } from "../middleware/handleInputErrors";
import { validateTokenInput } from "../middleware/validateTokenInput";
import { validateLoginInput } from "../middleware/validateLoginInput";
import { validateRequestToken } from "../middleware/validateRequestToken";
import { validateUpdatePasswordInput } from "../middleware/validateUpdatePasswordInput";
import { validateToken } from "../middleware/validateId";

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
  validateRequestToken,
  handleInputErrors,
  AuthController.requestConfirmationCode
);

router.post(
  "/forgot-password",
  validateRequestToken,
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

export default router;
