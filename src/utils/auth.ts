import bcrypt from "bcryptjs";

export const hashPassoword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const checkPassword = async (
  password: string,
  hashPassoword: string
) => {
  return await bcrypt.compare(password, hashPassoword);
};
