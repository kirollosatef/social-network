import Post from "./post.model";
import User from "../user/user.model";

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

class postRepo {
  static create = async (query: object = {}) => {
    const newPost = new Post(query);
    return await newPost.save();
  };

  static update = async (query: object = {}, form: object = {}) => {
    const post = await Post.findOne(query);
    if (post) {
      const isUpdeted = true;
      const newPost = {
        ...form,
        isUpdeted: isUpdeted,
      };
      return await Post.updateOne(query, newPost);
    } else {
      return {
        ...notFound,
      };
    }
  };

  static delete = async (userId: string, postId: string) => {
    const user = await User.findById(userId);
    if (user) {
      const post = await Post.findById({ _id: postId });
      if (post) {
        return await Post.deleteOne({ _id: postId });
      } else {
        return {
          ...notFound,
        };
      }
    } else {
      return {
        ...notFound,
      };
    }
  };
}

export default postRepo;
