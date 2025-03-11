import { Request, Response, NextFunction } from "express";
import { param, validationResult } from "express-validator";

export const validateId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("id").isMongoId().withMessage("ID no válido").run(req);

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  next();
};
