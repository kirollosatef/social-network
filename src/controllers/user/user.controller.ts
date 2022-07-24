import { Request, Response } from "express";
import {
  create,
  list,
  findByEmail,
  findByName,
  findByPhone,
  findBySchool,
  findByfieldOfStudy,
  findByCompany,
  findByStreet,
  findByCity,
  findByCountry,
  findByAddress,
  updateAll,
  updatePassword,
  updateEmail,
  updateName,
  updatePhone,
  updatePhoto,
} from "../../modules/user/repo";

const addUser = async (req: Request, res: Response) => {
  const user = req.body;
  const result = await create(user);
  res.status(200).json({ message: "success!!", Data: result });
};

const getUsers = async (req: Request, res: Response) => {
  const result = await list();
  res.status(200).json({ message: "success!!", Data: result });
};

export default {
  addUser,
  getUsers,
};
