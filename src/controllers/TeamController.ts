import type { Request, Response } from "express";
import Project from "../model/Project";
import User from "../model/User";

export class TeamController {
  static findMemberByEmail = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      //find User
      const user = await User.findOne({ email }).select("id name email");

      if (!user) {
        const error = new Error("Usuario no encontrado");
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      //console.log(error);
      res.status(500).json({ error: "Error inesperado" });
    }
  };

  static getProjectTeam = async (req: Request, res: Response) => {
    try {
      const project = await Project.findById(req.project.id).populate({
        path: "team",
        select: "id email name",
      });
      res.status(200).json(project.team);
    } catch (error) {
      //console.log(error);
      res.status(500).json({ error: "Error inesperado" });
    }
  };

  static addMemberById = async (req: Request, res: Response) => {
    try {
      const { id } = req.body;

      //find User
      const user = await User.findById(id).select("id");

      if (!user) {
        const error = new Error("Usuario no encontrado");
        res.status(404).json({ error: error.message });
        return;
      }

      if (
        req.project.team.some((team) => team.toString() === user.id.toString())
      ) {
        const error = new Error("El usuario ya está en el proyecto");
        res.status(409).json({ error: error.message });
        return;
      }
      req.project.team.push(user.id);

      await req.project.save();
      res.status(200).json({ message: "Usuario agregado correctamente" });
    } catch (error) {
      //console.log(error);
      res.status(500).json({ error: "Error inesperado" });
    }
  };

  static removeMemberById = async (req: Request, res: Response) => {
    try {
      const { id } = req.body;

      if (!req.project.team.some((team) => team.toString() === id)) {
        const error = new Error("El usuario no existe en el proyecto");
        res.status(409).json({ error: error.message });
        return;
      }

      req.project.team = req.project.team.filter(
        (teamMember) => teamMember.toString() !== id
      );

      await req.project.save();

      res.status(200).json({ message: "Miembro eliminado correctamente" });
    } catch (error) {
      //console.log(error);
      res.status(500).json({ error: "Error inesperado" });
    }
  };
}
