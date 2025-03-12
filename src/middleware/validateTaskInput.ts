import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

export const validateTaskInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("name")
    .notEmpty()
    .withMessage("El nombre de la tarea es obligatorio")
    .run(req);
  await body("description")
    .notEmpty()
    .withMessage("La descripción de la tarea es obligatoria")
    .run(req);

  next();
};
