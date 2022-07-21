import mongoose from "mongoose";

const jopSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  location: {
    city: { type: String },
    country: { type: String },
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Companies",
  },
  descreption: {
    type: String,
  },
  requirements: {
    type: String,
  },
  salary: {
    type: String,
  },
  type: {
    type: String,
    enum: ["fulltime", "parttime", "internship"],
  },
  appliedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open",
  },
  moreLink: {
    type: String,
  },
});

const Jop = mongoose.model("jops", jopSchema);

export default Jop;
