import { isExist } from "./../../modules/user/repo";
import { Request, Response } from "express";
import userRepo from "../../modules/user/repo";

const addUser = async (req: Request, res: Response) => {
  const user = req.body;
  if ((await (await isExist(user)).success) === true) {
    res.status(400).json({ message: "error!!", error: "user already exists" });
  } else {
    const result = await userRepo.create(user);
    res.status(200).json({ message: "success!!", Data: result });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.body;
  if ((await (await isExist({ _id: id })).success) === true) {
    const result = await userRepo.update({ _id: id }, user);
    res.status(200).json({ message: "success!!", Data: result });
  } else {
    res.status(400).json({ message: "error!!", error: "user not found" });
  }
};

const addSkill = async (req: Request, res: Response) => {
  const id = req.params.id;
  const skill = req.body;
  const result = (await userRepo.addSkill({ id }, skill)) as any;
  if (result.acknowledged === true) {
    res.status(200).json({ message: "success!!", Data: result });
  } else {
    res.status(400).json({ message: "error!!", Data: result });
  }
};

const addExperience = async (req: Request, res: Response) => {
  const id = req.params.id;
  const experience = req.body;
  const result = (await userRepo.addExperience({ id }, experience)) as any;
  if (result.acknowledged === true) {
    res.status(200).json({ message: "success!!", Data: result });
  } else {
    res.status(400).json({ message: "error!!", Data: result });
  }
};

const addEducation = async (req: Request, res: Response) => {
  const id = req.params.id;
  const education = req.body;
  const result = (await userRepo.addEducation({ id }, education)) as any;
  if (result.acknowledged === true) {
    res.status(200).json({ message: "success!!", Data: result });
  } else {
    res.status(400).json({ message: "error!!", Data: result });
  }
};

const addAddress = async (req: Request, res: Response) => {
  const id = req.params.id;
  const address = req.body;
  const result = (await userRepo.addAddress({ id }, address)) as any;
  if (result.acknowledged === true) {
    res.status(200).json({ message: "success!!", Data: result });
  } else {
    res.status(400).json({ message: "error!!", error: result });
  }
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

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  if ((await (await isExist({ _id: id })).success) === true) {
    const result = await userRepo.delete({ _id: id });
    res.status(200).json({ message: "success!!", Data: result });
  } else {
    res.status(400).json({ message: "error!!", error: "user not found" });
  }
};

const followUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const userId = req.params.userId;
  const result = await userRepo.followUser(id, userId);
  res.status(200).json({ message: "success!!", Data: result });
};

const unfollowUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const userId = req.params.userId;
  const result = await userRepo.unfollowUser(id, userId);
  res.status(200).json({ message: "success!!", Data: result });
};

const deleteSkill = async (req: Request, res: Response) => {
  const id = req.params.id;
  const skillId = req.params.skillId;
  const result = await userRepo.deleteSkill({ _id: id }, skillId);
  res.status(200).json({ message: "success!!", Data: result });
};

const deleteExperience = async (req: Request, res: Response) => {
  const id = req.params.id;
  const experienceId = req.params.experienceId;
  const result = await userRepo.deleteExperience({ _id: id }, experienceId);
  res.status(200).json({ message: "success!!", Data: result });
};

const deleteEducation = async (req: Request, res: Response) => {
  const id = req.params.id;
  const educationId = req.params.educationId;
  const result = await userRepo.deleteEducation({ _id: id }, educationId);
  res.status(200).json({ message: "success!!", Data: result });
};

const deleteAddress = async (req: Request, res: Response) => {
  const id = req.params.id;
  const addressId = req.params.addressId;
  const result = await userRepo.deleteAddress({ _id: id }, addressId);
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
  deleteUser,
  followUser,
  unfollowUser,
  updateUser,
  deleteSkill,
  deleteExperience,
  deleteEducation,
  deleteAddress,
};
