import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

export const validateRequestToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("email")
    .isEmail()
    .withMessage("El correo electrónico no es valido")
    .run(req);
  next();
};
