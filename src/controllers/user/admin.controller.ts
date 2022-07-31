import userRepo from "../../modules/user/repo";
import { Request, Response } from "express";

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await userRepo.delete({ _id: id });
  res.status(200).json({ message: "success!!", Data: result });
};

const getUserByExperience = async (req: Request, res: Response) => {
  const id = req.params.id;
  const years = req.params.yesrs;
  const users = await userRepo.get({ _id: id });
  var result = [];
  // return users with total experience greater than years
  if (users) {
    if (users.length > 0) {
      users.forEach((user) => {
        if (user.experience.length > 0) {
          user.experience.forEach((exp) => {
            if (exp.to.getFullYear() - exp.from.getFullYear() >= years) {
              result.push(user);
            }
          });
        }
      });
    }
  }
};
