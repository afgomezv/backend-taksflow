import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

export const validateUserInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("name")
    .notEmpty()
    .withMessage("El nombre del usuario es obligatorio")
    .run(req);
  await body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña es muy corta, mínimo 8 caracteres")
    .run(req);
  await body("password_confirmation")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Las contraseña no coinciden");
      }
      return true;
    })
    .run(req);
  await body("email")
    .isEmail()
    .withMessage("El correo electrónico no es valido")
    .run(req);

  next();
};
