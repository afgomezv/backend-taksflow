import type { Request, Response } from "express";
import User from "../model/User";
import Token from "../model/Token";
import { checkPassword, hashPassoword } from "../utils/auth";
import { AuthEmail } from "../emails/AuthEmail";
import { generateJWT } from "../utils/jwt";
import { generateToken } from "../utils/token";

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

  static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        const error = new Error("Usuario no encontrado.");
        res.status(404).json({ error: error.message });
        return;
      }

      if (!user.confirmed) {
        const token = new Token();
        token.token = generateToken();
        token.user = user.id;
        await token.save();

        AuthEmail.sendConfirmationEmail({
          name: user.name,
          email: user.email,
          token: token.token,
        });

        const error = new Error(
          "Debes confirmar tu cuenta primero. Se ha enviado correo electrónico de confirmación"
        );
        res.status(403).json({ error: error.message });
        return;
      }

      const isPasswordCorrect = await checkPassword(password, user.password);

      if (!isPasswordCorrect) {
        const error = new Error("Contraseña incorrecta.");
        res.status(401).json({ error: error.message });
        return;
      }

      const token = generateJWT({ id: user.id });
      res.status(200).json({ token });
    } catch (error) {
      //console.error(error);
      res.status(500).json({ error: "Error al iniciar sesión" });
    }
  };

  static requestConfirmationCode = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      // check if user already exists
      const user = await User.findOne({ email });
      if (!user) {
        const error = new Error(`El usuario no esta registrado.`);
        res.status(409).json({ error: error.message });
        return;
      }

      if (user.confirmed) {
        const error = new Error(
          "La cuenta ya está confirmada. No necesitas volver a solicitar un código de confirmación."
        );
        res.status(409).json({ error: error.message });
        return;
      }

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
        message: "Se ha enviado un nuevo token a tu correo electrónico",
      });
    } catch (error) {
      //console.error(error);
      res.status(500).json({ error: "Error al crear la cuenta" });
    }
  };

  static forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      // check if user already exists
      const user = await User.findOne({ email });
      if (!user) {
        const error = new Error(`El usuario no esta registrado.`);
        res.status(409).json({ error: error.message });
        return;
      }

      //Generate token
      const token = new Token();
      token.token = generateToken();
      token.user = user.id;

      await token.save();

      //send email
      AuthEmail.sendPasswordResetToken({
        name: user.name,
        email: user.email,
        token: token.token,
      });

      res.status(201).json({
        message: "Se ha enviado un nuevo token a tu correo electrónico",
      });
    } catch (error) {
      //console.error(error);
      res.status(500).json({ error: "Error al crear la cuenta" });
    }
  };

  static validateToken = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      const tokenExists = await Token.findOne({ token });

      if (!tokenExists) {
        const error = new Error("Token no válido.");
        res.status(401).json({ error: error.message });
        return;
      }

      res.status(200).json({
        message: "Token es válido. Ya puedes definir tu nueva contraseña",
      });
    } catch (error) {
      //console.error(error);
      res.status(500).json({ error: "Error al confirmar la cuenta" });
    }
  };

  static updatePasswordWithToken = async (req: Request, res: Response) => {
    try {
      const { token } = req.params;
      const { password } = req.body;
      const tokenExists = await Token.findOne({ token });

      if (!tokenExists) {
        const error = new Error("Token no válido.");
        res.status(401).json({ error: error.message });
        return;
      }

      const user = await User.findById(tokenExists.user);
      user.password = await hashPassoword(password);

      await Promise.allSettled([user.save(), tokenExists.deleteOne()]);

      res.status(200).json({
        message: "La contraseña se actualizado correctamente",
      });
    } catch (error) {
      //console.error(error);
      res.status(500).json({ error: "Error al confirmar la cuenta" });
    }
  };
}
