import mongoose, { Document, Schema, Types } from "mongoose";

export interface IToken extends Document {
  token: string;
  user: Types.ObjectId;
  createAt: Date;
}
9;
const tokenSchema: Schema = new Schema({
  token: { type: String, required: true },
  user: { type: Types.ObjectId, ref: "User", required: true },
  createAt: { type: Date, default: () => Date.now(), expires: "10m" },
});

const Token = mongoose.model<IToken>("Token", tokenSchema);
export default Token;
