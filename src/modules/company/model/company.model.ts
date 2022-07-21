import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const hashRounds = process.env.HASH_ROUNDS as unknown as number;

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: [
    {
      type: String,
      unique: true,
    },
  ],
  address: {
    street: String,
    city: String,
    country: String,
  },
  about: {
    type: String,
  },
  manger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
  ],
  jops: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jops",
    },
  ],
  role: {
    type: String,
    enum: ["normal", "outhrithed", "premium"],
    default: "normal",
  },
});

companySchema.pre("save", function (next) {
  const company = this;
  if (company.isModified("password")) {
    bcrypt.hash(company.password, hashRounds, function (err, hash) {
      if (err) return next(err);
      company.password = hash;
      next();
    });
  }
  next();
});

const Company = mongoose.model("Companies", companySchema);

export default Company;
