import type { Request, Response } from "express";
import User from "../model/User";

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    try {
      const user = new User(req.body);
      await user.save();
      res
        .status(201)
        .json({
          message:
            "Cuenta creada correctamente revisa tu correo electrónico para confirmarla",
        });
    } catch (error) {}
  };
}
