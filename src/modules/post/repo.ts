import mongoose from "mongoose";
import Post, { IPost } from "./post.model";

class postRepo {
  static create = async (query: object = {}) => {
    const newPost = new Post(query);
    return await newPost.save();
  };

  static update = async (query: object = {}, form: object = {}) => {
    const post = await Post.findOne(query);
    if (post) {
      const postId = post._id;
      const newId = new mongoose.Types.ObjectId();
      const isUpdeted = {
        type: true,
        post: postId,
      };
      const newPost = new Post({
        ...form,
        _id: newId,
        isUpdeted: isUpdeted,
      });
      return await newPost.save();
    }
  };
}
