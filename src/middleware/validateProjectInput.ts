import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

export const validateProjectInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("projectName")
    .notEmpty()
    .withMessage("El nombre del proyecto es obligatorio")
    .run(req);

  await body("clientName")
    .notEmpty()
    .withMessage("El nombre del cliente es obligatorio")
    .run(req);

  await body("description")
    .notEmpty()
    .withMessage("La descripción del proyecto es obligatoria")
    .run(req);

  next();
};
