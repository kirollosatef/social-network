import User, { IUser } from "./user.model";
import bycrypt from "bcrypt";
import isExist from "./helpers/isExist";
import isElementIn from "./helpers/isElementIn";
import { Types } from "mongoose";
const notFound = {
  code: 404,
  success: false,
  errors: [
    {
      key: "record",
      value: `record not found`,
    },
  ],
};
class userRepo {
  // TODO: JWT token
  //? CREATE
  static create = async (query: object = {}) => {
    const newUser = new User(query);
    return await newUser.save();
  };
  //? auth
  static comparePassword = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bycrypt.compare(password, user.password);
      if (isMatch) {
        return true;
      }
    }
    return false;
  };
  //? SELECT
  static list = async (query: object = {}) => {
    if (await isExist(query)) {
      return await User.find(query);
    } else {
      return {
        ...notFound,
      };
    }
  };
  static get = async (query: object = {}) => {
    if (await isExist(query)) {
      return await User.findOne(query);
    } else {
      return {
        ...notFound,
      };
    }
  };
  //? UPDATE
  static update = async (query: object = {}, form: object = {}) => {
    if (await isExist(query)) {
      return await User.updateMany(query, form);
    }
    return {
      ...notFound,
    };
  };
  //? ADD
  static addSkill = async (query: object = {}, form: IUser["skills"][0]) => {
    const user = await User.findOne(query);
    if (user) {
      const skills = user.skills;
      if (!isElementIn(form, skills)) {
        return await User.updateMany(query, { $push: { skills: form } });
      }
    }
    return {
      ...notFound,
    };
  };
  static addExperience = async (
    query: object = {},
    form: IUser["experiences"][0]
  ) => {
    const user = await User.findOne(query);
    if (user) {
      const experiences = user.experiences;
      if (!isElementIn(form, experiences)) {
        return await User.updateMany(query, { $push: { experiences: form } });
      }
    }
    return {
      ...notFound,
    };
  };
  static addEducation = async (
    query: object = {},
    form: IUser["educations"][0]
  ) => {
    const user = await User.findOne(query);
    if (user) {
      const educations = user.educations;
      if (!isElementIn(form, educations)) {
        return await User.updateMany(query, { $push: { educations: form } });
      }
    }
    return {
      ...notFound,
    };
  };
  static addAddress = async (
    query: object = {},
    form: IUser["addresses"][0]
  ) => {
    const user = await User.findOne(query);
    if (user) {
      const addresses = user.addresses;
      if (!isElementIn(form, addresses)) {
        return await User.updateMany(query, { $push: { addresses: form } });
      }
    }
    return {
      ...notFound,
    };
  };
  static followUser = async (id: Types.ObjectId, userId: Types.ObjectId) => {
    if (userId === id) {
      return {
        code: 400,
        success: false,
        errors: [
          {
            key: "follow",
            value: "you can't follow yourself",
          },
        ],
      };
    }
    const user = await User.findById(id);
    if (user) {
      const followers = user.followers;
      if (!isElementIn(userId, followers) && (await isExist({ _id: userId }))) {
        followers.push(userId);
        await User.updateMany({ _id: id }, { followers });
      }
    } else {
      return {
        ...notFound,
        "errors.ex": `user with id ${id} not found`,
      };
    }
    const userToFollow = await User.findById(userId);
    if (userToFollow) {
      const following = userToFollow.following;
      if (!isElementIn(id, following) && (await isExist({ _id: id }))) {
        following.push(id);
        await User.updateMany({ _id: userId }, { following });
      }
    } else {
      return {
        ...notFound,
        "errors.ex": `user with id ${userId} not found`,
      };
    }
  };
  // ? DELETE
  static delete = async (query: object = {}) => {
    if (await isExist(query)) {
      return await User.deleteMany(query);
    }
    return {
      ...notFound,
    };
  };
  static deleteSkill = async (query: object = {}, skillId: string) => {
    if (await isExist(query)) {
      return await User.updateMany(query, {
        $pull: { skills: { _id: skillId } },
      });
    }
  };
  static deleteExperience = async (
    query: object = {},
    experienceId: string
  ) => {
    if (await isExist(query)) {
      return await User.updateMany(query, {
        $pull: { experiences: { _id: experienceId } },
      });
    }
  };
  static deleteEducation = async (query: object = {}, educationId: string) => {
    if (await isExist(query)) {
      return await User.updateMany(query, {
        $pull: { educations: { _id: educationId } },
      });
    }
  };
  static deleteAddress = async (query: object = {}, addressId: string) => {
    if (await isExist(query)) {
      return await User.updateMany(query, {
        $pull: { addresses: { _id: addressId } },
      });
    }
  };
  static unfollowUser = async (id: Types.ObjectId, userId: Types.ObjectId) => {
    const user = await User.findById(id);
    if (user) {
      const followers = user.followers;
      if (isElementIn(userId, followers)) {
        followers.splice(followers.indexOf(userId), 1);
        await User.updateMany({ _id: id }, { followers });
      }
    } else {
      return {
        ...notFound,
        "errors.ex": `user with id ${id} not found`,
      };
    }
    const userToUnfollow = await User.findById(userId);
    if (userToUnfollow) {
      const following = userToUnfollow.following;
      if (isElementIn(id, following)) {
        following.splice(following.indexOf(id), 1);
        await User.updateMany({ _id: userId }, { following });
      }
    } else {
      return {
        ...notFound,
        "errors.ex": `user with id ${userId} not found`,
      };
    }
  };
}

export default userRepo;
