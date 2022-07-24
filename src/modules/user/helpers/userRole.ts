import User from "../user.model";

export const isAdmin = async (id: string): Promise<boolean> => {
  const user = await User.findById(id);
  if (user) {
    return user.role === "admin";
  }
  return false;
};

export const isPremium = async (id: string): Promise<boolean> => {
  const user = await User.findById(id);
  if (user) {
    return user.role === "premium";
  }
  return false;
};
