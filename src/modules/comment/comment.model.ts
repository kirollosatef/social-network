import { Document, Types, Schema, model } from "mongoose";

enum reacts {
  "like",
  "disLike",
}

export interface IComment extends Document {
  text: string;
  date: Date;
  post: Types.ObjectId;
  user: Types.ObjectId;
  reacts: [reacts];
  isReply: { type: boolean; comment: Types.ObjectId };
}

const commentSchema = new Schema<IComment>({
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
    type: Schema.Types.ObjectId,
    ref: "posts",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  reacts: [
    {
      type: String,
      enum: reacts,
    },
  ],
  isReply: {
    type: Boolean,
    default: false,
    comment: {
      type: Schema.Types.ObjectId,
      ref: "comments",
    },
  },
});

const Comment = model("comments", commentSchema);

export default Comment;
