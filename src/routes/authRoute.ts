import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { validateUserInput } from "../middleware/validateUserInput";
import { handleInputErrors } from "../middleware/handleInputErrors";
import { validateTokenInput } from "../middleware/validateTokenInput";
import { validateLoginInput } from "../middleware/validateLoginInput";

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

export default router;
