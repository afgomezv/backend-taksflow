import type { Request, Response } from "express";
import User from "../model/User";
import Token from "../model/Token";
import { hashPassoword } from "../utils/auth";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";

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

      //Generate token
      const token = new Token();
      token.token = generateToken();
      token.user = user.id;

      //send email
      AuthEmail.sendConfirmationEmail({
        name: user.name,
        email: user.email,
        token: token.token,
      });

      await Promise.allSettled([user.save(), token.save()]);

      res.status(201).json({
        message:
          "Cuenta creada con éxito. Revisa tu correo electrónico para confirmarla.",
      });
    } catch (error) {
      //console.error(error);
      res.status(500).json({ error: "Error al crear la cuenta" });
    }
  };

  static confirmAccount = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      const tokenExists = await Token.findOne({ token });

      if (!tokenExists) {
        const error = new Error("Token no válido.");
        res.status(401).json({ error: error.message });
        return;
      }

      const user = await User.findOne(tokenExists.user);
      user.confirmed = true;

      await Promise.allSettled([user.save(), tokenExists.deleteOne()]);

      res.status(200).json({
        message:
          "Cuenta confirmada correctamente. Ahora puedes iniciar sesión.",
      });
    } catch (error) {
      //console.error(error);
      res.status(500).json({ error: "Error al confirmar la cuenta" });
    }
  };
}
