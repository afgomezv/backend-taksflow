import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

export const validateTaskStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("status")
    .notEmpty()
    .withMessage("El estado es obligatorio")
    .run(req);

  next();
};
