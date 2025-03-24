import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

export const validateNoteInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("content")
    .notEmpty()
    .withMessage("El contenido es obligatorio")
    .run(req);

  next();
};
