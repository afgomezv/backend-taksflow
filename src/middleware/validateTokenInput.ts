import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

export const validateTokenInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("token")
    .notEmpty()
    .withMessage("El token es obligatorio")
    .run(req);

  next();
};
