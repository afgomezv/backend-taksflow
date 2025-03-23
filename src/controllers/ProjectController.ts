import type { Request, Response } from "express";
import Project from "../model/Project";
import Task from "../model/Task";

export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);

    //Asignar un manager
    project.manager = req.user.id;

    try {
      await project.save();
      res.status(201).json({ message: "Proyecto creado correctamente" });
    } catch (error) {
      //console.log(error);
      res.status(500).json({ error: "Error al crear proyecto" });
    }
  };

  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({
        $or: [
          { manager: { $in: req.user.id } },
          { team: { $in: req.user.id } },
        ],
      });
      res.status(200).json(projects);
    } catch (error) {
      //console.log(error);
      res.status(500).json({ error: "Error al obtener proyectos" });
    }
  };

  static getProjectById = async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;
      const project = await Project.findById(projectId).populate("tasks");

      if (!project) {
        const error = new Error("Proyecto no encontrado");
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(200).json(project);
    } catch (error) {
      //console.log(error);
      res.status(500).json({ error: "Error al obtener proyecto" });
    }
  };

  static updateProject = async (req: Request, res: Response) => {
    try {
      req.project.clientName = req.body.clientName;
      req.project.projectName = req.body.projectName;
      req.project.description = req.body.description;
      await req.project.save();
      res
        .status(200)
        .json({ message: "Proyecto se actualizado correctamente" });
    } catch (error) {
      //console.log(error);
      res.status(500).json({ error: "Error actualizar proyecto" });
    }
  };

  static deleteProject = async (req: Request, res: Response) => {
    try {
      //TODO: verificar: await Task.deleteMany({ projectId: req.project.id });
      await req.project.deleteOne();
      res.json({ message: "Proyecto eliminado correctamente" });
    } catch (error) {
      //console.log(error);
      res.status(500).json({ error: "Error eliminar proyecto" });
    }
  };
}
