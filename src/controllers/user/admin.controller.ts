import { IUser } from "./../../modules/user/user.model";
import userRepo from "../../modules/user/repo";
import { Request, Response } from "express";

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await userRepo.delete({ _id: id });
  res.status(200).json({ message: "success!!", Data: result });
};

const getUserByExperience = async (req: Request, res: Response) => {
  const id = req.params.id;
  const years = req.params.yesrs as unknown as number;
  const users = (await userRepo.list({ _id: id })) as IUser[];
  var result = [];
  if (users) {
    users.forEach((user) => {
      if (user.experiences.length > 0) {
        user.experiences.forEach((exp) => {
          if (Number(exp.to) - Number(exp.from) > years) {
            result.push(user);
          }
        });
      }
    });
  }
};

export default {
  deleteUser,
  getUserByExperience,
};
