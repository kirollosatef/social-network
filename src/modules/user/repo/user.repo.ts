import User from "../model/user.model";
import userInterface from "./helpers/user.interface";

export const create = async (user: userInterface) => {
  return await User.create(user);
};

export const update = async (id: string, user: userInterface) => {
  return await User.findByIdAndUpdate(id, user);
};

export const list = async () => {
  return await User.find();
};

export const findById = async (id: string) => {
  return await User.findById(id);
};

export const findByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const findByEmailAndPassword = async (
  email: string,
  password: string
) => {
  return await User.findOne({ email, password });
};
