import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

export const validateEmailInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("email")
    .isEmail()
    .toLowerCase()
    .withMessage("El correo electrónico no es valido")
    .run(req);
  next();
};
