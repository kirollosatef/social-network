import User from "./user.model";
import userInterface from "./helpers/user.interface";
import { numberOfYears } from "./helpers/calcDate";
import { isAdmin, isPremium } from "./helpers/userRole";
import { auth } from "./helpers/auth";
import mongoose from "mongoose";
import { query } from "express";

// TODO: JWT token
//? CREATE
export const create = async (user) => {
  const user = new User(user);
  return await user.save();
};
//in update method
// export const createAdmin = async (id: string, user: userInterface) => {
//   if (await isAdmin(id)) {
//     // user.role = "admin";
//     return await User.create(user);
//   }
// };
//TODO: cretate primume user

//? SELECT
// !
export const list = async (query: object = {}) => {
  return await User.find(query);
};
//TODO : get one
export const get = async (query: object = {}) => {
  return await User.findOne(query);
};

export const findById = async (id: string) => {
  return await User.findById(id);
};

export const findByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const findByName = async (name: string) => {
  return await User.find({ name });
};

export const findByPhone = async (phone: string) => {
  return await User.findOne({ phone });
};

export const findBySchool = async (school: string) => {
  return await User.find({
    educations: { education: { $elemMatch: { school: school } } },
  });
};

export const findByfieldOfStudy = async (fieldOfStudy: string) => {
  return await User.find({
    education: { $elemMatch: { fieldOfStudy: fieldOfStudy } },
  });
};

export const findByDegree = async (degree: string) => {
  return await User.find({
    education: { $elemMatch: { degree: degree } },
  });
};

export const findByPosition = async (position: string) => {
  return await User.find({
    experience: { $elemMatch: { position: position } },
  });
};

export const findByCompany = async (company: string) => {
  return await User.find({
    experience: { $elemMatch: { company: company } },
  });
};

//! find by years of experience!!
export const findByYearsOfExperience = async (yearsOfExperience: number) => {
  const usres = await User.find({ experiences: [] });
  const findUsers = usres.filter((user) => {
    var userYears = 0;
    for (var i = 0; i < user.experiences.length; i++) {
      const from = user.experiences[i].experience.from as unknown as Date;
      const to = user.experiences[i].experience.to as unknown as Date;
      userYears += numberOfYears(from, to);
    }
    return userYears >= yearsOfExperience;
  });
  return findUsers;
};

export const findByStreet = async (street: string) => {
  return await User.find({ addresses: { $elemMatch: { street: street } } });
};

export const findByCity = async (city: string) => {
  return await User.find({ addresses: { $elemMatch: { city: city } } });
};

export const findByCountry = async (country: string) => {
  return await User.find({ addresses: { $elemMatch: { country: country } } });
};

export const findByAddress = async (address: userInterface["addresses"][0]) => {
  return await User.find({ addresses: { $elemMatch: { address: address } } });
};

export const findBySkill = async (skill: string) => {
  return await User.find({
    skills: { skill: { $elemMatch: { name: skill } } },
  });
};

export const findBySkillAndLevel = async (skill: string, level: string) => {
  return await User.find({
    skills: { skill: { $elemMatch: { name: skill, level: level } } },
  });
};

export const findBySkills = async (skills: string[]) => {
  return await User.find({
    skills: { skill: { $elemMatch: { name: { $in: skills } } } },
  });
};

export const findBySkillsAndLevel = async (skills: userInterface["skills"]) => {
  return await User.find({
    skills: {
      skill: {
        $elemMatch: { name: { $in: skills.map((skill) => skill.name) } },
      },
    },
  });
};

//? UPDATE
// !!! id || query
export const updateAll = async (query, form) => {
  if (await auth(user.email, user.password)) {
    return await User.findByIdAndUpdate(id, user);
  }
};

export const updatePhone = async (id: string, phone: string) => {
  return await User.findByIdAndUpdate(id, { phone });
};

export const updateEmail = async (
  id: string,
  password: string,
  email: string
) => {
  if (await auth(email, password)) {
    return await User.findByIdAndUpdate(id, { email });
  }
};

export const updatePassword = async (
  id: string,
  password: string,
  newPassword: string
) => {
  const email = (await User.findById(id).select("email")) as unknown as string;
  if (await auth(email, password)) {
    return await User.findByIdAndUpdate(id, { password: newPassword });
  }
};

export const updateName = async (id: string, name: string) => {
  return await User.findByIdAndUpdate(id, { name });
};

export const updatePhoto = async (id: string, photo: string) => {
  return await User.findByIdAndUpdate(id, { photo });
};

export const updateAbout = async (id: string, about: string) => {
  return await User.findByIdAndUpdate(id, { about });
};

export const updateCurrentWork = async (
  id: string,
  currentWork: userInterface["currentWork"]
) => {
  return await User.findByIdAndUpdate(id, { currentWork });
};

export const updateResume = async (id: string, resume: string) => {
  return await User.findByIdAndUpdate(id, { resume });
};

//! update spacific address or education or experience or skill

//? ADD
//! add enum value
// object

export const addSkill = async (
  id: string,
  skill: userInterface["skills"][0]
) => {
  return await User.findByIdAndUpdate(id, {
    $push: { skills: { skill: skill } },
  });
};

export const addAddress = async (
  id: string,
  address: userInterface["addresses"][0]
) => {
  return await User.findByIdAndUpdate(id, {
    $push: { addresses: { address: address } },
  });
};

export const addEducation = async (
  id: string,
  education: userInterface["educations"][0]
) => {
  return await User.findByIdAndUpdate(id, {
    $push: { educations: { education: education } },
  });
};

export const addExperience = async (
  id: string,
  experience: userInterface["experiences"][0]
) => {
  return await User.findByIdAndUpdate(id, {
    $push: { experiences: { experience: experience } },
  });
};

//! follow user
// follow user
export const followUser = async (
  id: string,
  userId: userInterface["following"][0]
) => {};

//? DELETE

export const deleteUser = async (
  id: string,
  email: string,
  password: string
) => {
  if (await auth(email, password)) {
    return await User.findByIdAndDelete(id);
  }
};

export const deleteUserAdmine = async (id: string, userId: string) => {
  if (await isAdmin(userId)) {
    return await User.findByIdAndDelete(id);
  }
};

export const deletePhoto = async (id: string) => {
  return await User.findByIdAndUpdate(id, { photo: "" });
};

//! address id

export const deleteAdress = async (
  id: string,
  address: userInterface["addresses"][0]
) => {
  return await User.findByIdAndUpdate(id, {
    $pull: { addresses: { address: address } },
  });
};

export const deleteAllAddresses = async (id: string) => {
  return await User.findByIdAndUpdate(id, { addresses: [] });
};

export const deleteEducation = async (
  id: string,
  education: userInterface["educations"][0]
) => {
  return await User.findByIdAndUpdate(id, {
    $pull: { educations: { education: education } },
  });
};

// export const deleteAllEducations = async (id: string) => {
//   return await User.findByIdAndUpdate(id, { educations: [] });
// };

export const deleteExperience = async (
  id: string,
  experience: userInterface["experiences"][0]
) => {
  return await User.findByIdAndUpdate(id, {
    $pull: { experiences: { experience: experience } },
  });
};

// export const deleteAllExperiences = async (id: string) => {
//   return await User.findByIdAndUpdate(id, { experiences: [] });
// };

export const deleteSkill = async (
  id: string,
  skill: userInterface["skills"]
) => {
  return await User.findByIdAndUpdate(id, {
    $pull: { skills: { skill: skill } },
  });
};

export const deleteAllSkills = async (id: string) => {
  return await User.findByIdAndUpdate(id, { skills: [] });
};

export const deleteResume = async (id: string) => {
  return await User.findByIdAndUpdate(id, { resume: "" });
};

//! unfollow user
export const UnfollowUser = async (
  id: string,
  userId: userInterface["following"][0]
) => {
  return await User.findByIdAndUpdate(id, {
    $pull: { following: userId },
  });
};
