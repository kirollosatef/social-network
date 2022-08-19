import commentRepo from "../../modules/comment/repo";

import { Request, Response } from "express";

const listComments = async (req: Request, res: Response) => {
  const result = await commentRepo.list();
  res.status(200).json({ message: "success!!", Data: result });
};

const listCommentUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const result = await commentRepo.list({ user: userId });
  res.status(200).json({ message: "success!!", Data: result });
};

const getComment = async (req: Request, res: Response) => {
  const commentId = req.params.commentId;
  const result = await commentRepo.get({ _id: commentId });
  res.status(200).json({ message: "success!!", Data: result });
};

const addComment = async (req: Request, res: Response) => {
  const comment = req.body;
  const result = await commentRepo.create(comment);
  res.status(200).json({ message: "success!!", Data: result });
};

const updateComment = async (req: Request, res: Response) => {
  const id = req.params.id;
  const comment = req.body;
  const result = await commentRepo.update({ _id: id }, comment);
  res.status(200).json({ message: "success!!", Data: result });
};

const deleteComment = async (req: Request, res: Response) => {
  const id = req.params.id;
  const userId = req.params.userId;
  const result = await commentRepo.delete(id, userId);
  res.status(200).json({ message: "success!!", Data: result });
};

export default {
  addComment,
  getComment,
  listComments,
  listCommentUser,
  updateComment,
  deleteComment,
};
