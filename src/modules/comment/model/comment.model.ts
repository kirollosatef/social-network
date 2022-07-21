import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  isReply: {
    type: Boolean,
    default: false,
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
  },
});

const Comment = mongoose.model("comments", commentSchema);

module.exports = Comment;
