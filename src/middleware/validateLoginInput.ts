import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

export const validateLoginInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("email")
    .isEmail()
    .withMessage("El correo electrónico no es valido")
    .run(req);
  await body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .run(req);

  next();
};
