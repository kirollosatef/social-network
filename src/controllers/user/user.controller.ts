import { Request, Response } from "express";
import userRepo from "../../modules/user/repo";

const addUser = async (req: Request, res: Response) => {
  const user = req.body;
  const result = await userRepo.create(user);
  res.status(200).json({ message: "success!!", Data: result });
};

const addSkill = async (req: Request, res: Response) => {
  const id = req.params.id;
  const skill = req.body;
  const result = await userRepo.addSkill({ id }, skill);
  res.status(200).json({ message: "success!!", Data: result });
};

const addExperience = async (req: Request, res: Response) => {
  const id = req.params.id;
  const experience = req.body;
  const result = await userRepo.addExperience({ id }, experience);
  res.status(200).json({ message: "success!!", Data: result });
};

const addEducation = async (req: Request, res: Response) => {
  const id = req.params.id;
  const education = req.body;
  const result = await userRepo.addEducation({ id }, education);
  res.status(200).json({ message: "success!!", Data: result });
};

const addAddress = async (req: Request, res: Response) => {
  const id = req.params.id;
  const address = req.body;
  const result = await userRepo.addAddress({ id }, address);
  res.status(200).json({ message: "success!!", Data: result });
};

const listUsers = async (req: Request, res: Response) => {
  const result = await userRepo.list();
  res.status(200).json({ message: "success!!", Data: result });
};

const listByName = async (req: Request, res: Response) => {
  const name = req.params.name;
  const result = await userRepo.list({ name: name });
  res.status(200).json({ message: "success!!", Data: result });
};

const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await userRepo.list({ _id: id });
  res.status(200).json({ message: "success!!", Data: result });
};

export default {
  addUser,
  addSkill,
  addExperience,
  addEducation,
  addAddress,
  listUsers,
  listByName,
  getUserById,
};
