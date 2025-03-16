import type { Request, Response } from "express";

import User from "../model/User";
import { hashPassoword } from "../utils/auth";

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    try {
      const { password, email } = req.body;

      // check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        const error = new Error(`El usuario ya se encuentra registrado.`);
        res.status(409).json({ error: error.message });
        return;
      }

      // Create a new account
      const user = new User(req.body);

      //hash password
      user.password = await hashPassoword(password);
      await user.save();
      res.status(201).json({
        message:
          "Cuenta creada con éxito. Revisa tu correo electrónico para confirmarla.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear la cuenta" });
    }
  };
}
