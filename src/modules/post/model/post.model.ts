import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  tages: [
    {
      enum: ["food", "drink", "culture", "sport", "other"],
      type: String,
      // add more tags from api
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    trim: true,
    required: true,
  },
  midea: {
    type: String,
    enum: ["image", "video", "pdf", "other"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  inCompany: {
    type: Boolean,
    default: false,
    company: { type: mongoose.Schema.Types.ObjectId, ref: "companys" },
  },
  isUpdeted: {
    type: Boolean,
    default: false,
    oldPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
  },
  reacts: [
    {
      type: {
        type: String,
        enum: ["like", "dislike", "love", "haha", "wow", "sad", "angry"],
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
  ],
  isAD: {
    type: Boolean,
    default: false,
  },
});

const Post = mongoose.model("posts", postSchema);

module.exports = Post;
