import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import bcrypt from "bcryptjs";

export const getAuthToken = async (id: number, email: string) => {
  try {
    const expiresIn = (process.env.JWT_EXPIRY ?? "1h") as StringValue;
    const token = jwt.sign({ id, email }, process.env.JWT_SECRET_KEY as string, {
      expiresIn,
    });
    return token;
  } catch (error) {
    throw error;
  }
};

export const validatePassword = async (password: string, oldPassword: string) => {
  return await bcrypt.compare(password, oldPassword);
};
