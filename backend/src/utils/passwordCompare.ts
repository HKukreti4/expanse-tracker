import bcrypt from "bcryptjs";

export const checkPass = async (
  inputPass: string,
  hashPass: string
): Promise<boolean> => {
  return await bcrypt.compare(inputPass, hashPass);
};
