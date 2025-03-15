import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { validateUserInput } from "../middleware/validateUserInput";
import { handleInputErrors } from "../middleware/handleInputErrors";

const router = Router();

router.post(
  "/create-account",
  validateUserInput,
  handleInputErrors,
  AuthController.createAccount
);

export default router;
