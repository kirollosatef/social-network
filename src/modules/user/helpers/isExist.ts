import User, { IUser } from "../user.model";

const isExist = async (query: object = {}) => {
  const record: IUser | null = await User.findOne(query);
  if (record) {
    return {
      success: true,
      record,
      code: 200,
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

export default isExist;
