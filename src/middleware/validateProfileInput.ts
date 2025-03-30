import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

export const validateProfileInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .run(req);
  await body("email")
    .isEmail()
    .toLowerCase()
    .withMessage("El correo electrónico no es valido")
    .run(req);

  next();
};
