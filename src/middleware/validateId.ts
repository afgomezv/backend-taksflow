import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";

export const validateProjectId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("projectId").isMongoId().withMessage("ID no válido").run(req);

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  next();
};

export const validateTaskId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("taskId").isMongoId().withMessage("ID no válido").run(req);

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  next();
};

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("token").isNumeric().withMessage("Token no válido").run(req);

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  next();
};

export const validateUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("id").isMongoId().withMessage("ID de usuario no valido").run(req);

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  next();
};
