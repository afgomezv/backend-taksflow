import jwt from "jsonwebtoken";
import Types from "mongoose";

type UserPayload = {
  id: Types.ObjectId;
};

export const generateJWT = (payload: UserPayload) => {
  const token = jwt.sign(payload, process.env.JWT_TOKEN, {
    expiresIn: "12h",
  });

  return token;
};

export const verifyJWT = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_TOKEN);

  return decoded;
};
