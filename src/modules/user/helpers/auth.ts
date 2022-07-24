import bycrypt from "bcrypt";
import User from "../user.model";
import dotenv from "dotenv";
dotenv.config();

const bcryptPassword = process.env.BCRYPT_PASSWORD as unknown as string;

export const auth = async (
  email: string | StringConstructor,
  password: string | StringConstructor
): Promise<boolean> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const isValid = await bycrypt.compare(
    password + bcryptPassword,
    user.password
  );
  if (!isValid) {
    return false;
  }
  return true;
};
