import User, { IUser } from "./user.model";
import bycrypt from "bcrypt";
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
export const isExist = async (query: object = {}) => {
  const record: IUser | null = await User.findOne(query);
  if (record) {
    return {
      code: 200,
      success: true,
      record,
    };
  } else {
    return {
      code: 404,
      success: false,
      errors: [
        {
          key: "record",
          value: `record not found`,
        },
      ],
    };
  }
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
      return await User.updateOne(query, form);
    }
    return {
      ...notFound,
    };
  };
  //? ADD
  static addSkill = async (query: object = {}, form: IUser["skills"][0]) => {
    const user = await User.findOne(query);
    if (user) {
      const skills = user.skills.map((skill) => {
        return {
          name: skill.name,
          level: skill.level,
        };
      });
      if (!isElementIn(form, skills)) {
        return await User.updateOne(query, { $push: { skills: form } });
      } else {
        return {
          code: 400,
          success: false,
          errors: [
            {
              key: "skill",
              value: "skill already exist",
            },
          ],
        };
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
      const experiences = user.experiences.map((experience) => {
        return {
          company: experience.company,
          position: experience.position,
          from: experience.from,
          to: experience.to,
        };
      });
      if (!isElementIn(form, experiences)) {
        return await User.updateOne(query, { $push: { experiences: form } });
      } else {
        return {
          code: 400,
          success: false,
          errors: [
            {
              key: "experience",
              value: "experience already exist",
            },
          ],
        };
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
      const educations = user.educations.map((education) => {
        return {
          school: education.school,
          degree: education.degree,
          fieldOfStudy: education.fieldOfStudy,
          from: education.from,
          to: education.to,
        };
      });
      if (!isElementIn(form, educations)) {
        return await User.updateOne(query, { $push: { educations: form } });
      } else {
        return {
          code: 400,
          success: false,
          errors: [
            {
              key: "education",
              value: "education already exist",
            },
          ],
        };
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
      const addresses = user.addresses.map((address) => {
        return {
          street: address.street,
          city: address.city,
          country: address.country,
        };
      });
      if (!isElementIn(form, addresses)) {
        return await User.updateOne(query, { $push: { addresses: form } });
      } else {
        return {
          code: 400,
          success: false,
          errors: [
            {
              key: "address",
              value: "address already exist",
            },
          ],
        };
      }
    }
    return {
      ...notFound,
    };
  };
  static followUser = async (id: string, userId: string) => {
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
      const userId1 = userId as unknown as Types.ObjectId;
      const followers = user.followers;
      if (
        !isElementIn(userId1, followers) &&
        (await isExist({ _id: userId }))
      ) {
        followers.push(userId1);
        await User.updateOne({ _id: id }, { followers });
      }
    } else {
      return {
        ...notFound,
        "errors.ex": `user with id ${id} not found`,
      };
    }
    const userToFollow = await User.findById(userId);
    if (userToFollow) {
      const id1 = id as unknown as Types.ObjectId;
      const following = userToFollow.following;
      if (!isElementIn(id1, following) && (await isExist({ _id: id }))) {
        following.push(id1);
        await User.updateOne({ _id: userId }, { following });
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
    if ((await (await isExist(query)).success) === true) {
      return await User.deleteOne(query);
    } else {
      return {
        ...notFound,
      };
    }
  };
  static deleteSkill = async (query: object = {}, skillId: string) => {
    if (await isExist(query)) {
      return await User.updateOne(query, {
        $pull: { skills: { _id: skillId } },
      });
    }
  };
  static deleteExperience = async (
    query: object = {},
    experienceId: string
  ) => {
    if (await isExist(query)) {
      return await User.updateOne(query, {
        $pull: { experiences: { _id: experienceId } },
      });
    }
  };
  static deleteEducation = async (query: object = {}, educationId: string) => {
    if (await isExist(query)) {
      return await User.updateOne(query, {
        $pull: { educations: { _id: educationId } },
      });
    }
  };
  static deleteAddress = async (query: object = {}, addressId: string) => {
    if (await isExist(query)) {
      return await User.updateOne(query, {
        $pull: { addresses: { _id: addressId } },
      });
    }
  };
  static unfollowUser = async (id: string, userId: string) => {
    const user = await User.findById(id);
    if (user) {
      const userId1 = userId as unknown as Types.ObjectId;
      const followers = user.followers;
      if (isElementIn(userId1, followers)) {
        followers.splice(followers.indexOf(userId1), 1);
        await User.updateOne({ _id: id }, { followers });
      }
    } else {
      return {
        ...notFound,
        "errors.ex": `user with id ${id} not found`,
      };
    }
    const userToUnfollow = await User.findById(userId);
    if (userToUnfollow) {
      const id1 = id as unknown as Types.ObjectId;
      const following = userToUnfollow.following;
      if (isElementIn(id1, following)) {
        following.splice(following.indexOf(id1), 1);
        await User.updateOne({ _id: userId }, { following });
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
