import postRepo from "../../modules/post/repo";
import { Request, Response } from "express";

const listPosts = async (req: Request, res: Response) => {
  const result = await postRepo.list();
  res.status(200).json({ message: "success!!", Data: result });
};

const listPostUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const result = await postRepo.list({ user: userId });
  res.status(200).json({ message: "success!!", Data: result });
};

const getPost = async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const result = await postRepo.get({ _id: postId });
  res.status(200).json({ message: "success!!", Data: result });
};

const addPost = async (req: Request, res: Response) => {
  const post = req.body;
  const result = await postRepo.create(post);
  res.status(200).json({ message: "success!!", Data: result });
};

const updatePost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const post = req.body;
  const result = await postRepo.update({ _id: id }, post);
  res.status(200).json({ message: "success!!", Data: result });
};

const deletePost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const userId = req.params.userId;
  const result = await postRepo.delete(id, userId);
  res.status(200).json({ message: "success!!", Data: result });
};

export default {
  addPost,
  getPost,
  listPosts,
  listPostUser,
  updatePost,
  deletePost,
};
