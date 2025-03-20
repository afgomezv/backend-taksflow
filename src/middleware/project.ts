import { Request, Response, NextFunction } from "express";
import Project, { IProject } from "../model/Project";

declare global {
  namespace Express {
    interface Request {
      project: IProject;
    }
  }
}

export async function projectExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (!project) {
      const error = new Error("Proyecto no encontrado");
      res.status(404).json({ error: error.message });
      return;
    }
    req.project = project;
    next();
  } catch (error) {
    //console.error(error);
    res.status(500).json({ error: "Error inesperado" });
  }
}

export async function projectBelongsToUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.project.manager.toString() !== req.user.id.toString()) {
    const error = new Error("No tienes permisos sobre este proyecto");
    res.status(403).json({ error: error.message });
    return;
  }

  next();
}
