import bcrypt from "bcryptjs";

export const hashPassoword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
