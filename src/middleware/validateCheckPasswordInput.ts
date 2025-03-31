import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

export const validateCheckPasswordInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .run(req);

  next();
};
