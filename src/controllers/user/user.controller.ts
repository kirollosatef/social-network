import { Request, Response } from "express";
import userRepo from "../../modules/user/repo";

const addUser = async (req: Request, res: Response) => {
  const user = req.body;
  const result = await userRepo.create(user);
  res.status(200).json({ message: "success!!", Data: result });
};

const listUsers = async (req: Request, res: Response) => {
  const result = await list();
  res.status(200).json({ message: "success!!", Data: result });
};

const listByName = async (req: Request, res: Response) => {
  const name = req.params.name;
  const result = await list({ name: name });
  res.status(200).json({ message: "success!!", Data: result });
};

const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await list({ _id: id });
  res.status(200).json({ message: "success!!", Data: result });
};
// //! find by years of experience!!
// export const findByYearsOfExperience = async (yearsOfExperience: number) => {
//   const usres = await User.find({ experiences: [] });
//   const findUsers = usres.filter((user) => {
//     var userYears = 0;
//     for (var i = 0; i < user.experiences.length; i++) {
//       const from = user.experiences[i].experience.from as unknown as Date;
//       const to = user.experiences[i].experience.to as unknown as Date;
//       userYears += numberOfYears(from, to);
//     }
//     return userYears >= yearsOfExperience;
//   });
//   return findUsers;
// };
export default {
  addUser,
  listUsers,
  listByName,
  getUserById,
};
