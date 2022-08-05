import { Document, Types, Schema, model } from "mongoose";

enum tages {
  "HTML",
  "CSS",
  "JavaScript",
}
enum reacts {
  "like",
  "disLike",
}

export interface IPost extends Document {
  tages: [tages];
  date: Date;
  content: string;
  midea: string;
  user: Types.ObjectId;
  inCompany: { type: boolean; company: Types.ObjectId };
  isUpdeted: { type: boolean; oldPost: Types.ObjectId };
  reacts: [{ type: reacts; user: Types.ObjectId }];
  comments: [Types.ObjectId];
  isAD: boolean;
}

const postSchema = new Schema<IPost>({
  tages: [
    {
      type: String,
      enum: tages,
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
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  inCompany: {
    type: Boolean,
    default: false,
    company: { type: Schema.Types.ObjectId, ref: "companys" },
  },
  isUpdeted: {
    type: Boolean,
    default: false,
    oldPost: {
      type: Schema.Types.ObjectId,
      ref: "posts",
    },
  },
  reacts: [
    {
      type: {
        type: String,
        enum: reacts,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comments",
    },
  ],
  isAD: {
    type: Boolean,
    default: false,
  },
});

const Post = model("posts", postSchema);

export default Post;
