import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/jwt";
import User, { IUser } from "../model/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    const error = new Error("No autorizado");
    res.status(401).json({ error: error.message });
    return;
  }

  //const token = bearer.split(" ")[1];
  const [, token] = bearer.split(" ");
  if (!token) {
    const error = new Error("No autorizado");
    res.status(401).json({ error: error.message });
    return;
  }

  // Validar el token
  try {
    const decoded = verifyJWT(token);
    if (typeof decoded === "object" && decoded.id) {
      const user = await User.findById(decoded.id).select("_id name email");
      if (user) {
        req.user = user;
      } else {
        res.status(500).json({ error: "Token no es válido" });
      }
      next();
    }
  } catch (err) {
    const error = new Error("Token inválido");
    res.status(401).json({ error: error.message });
    return;
  }
};
