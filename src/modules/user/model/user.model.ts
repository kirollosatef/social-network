import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const hashRoundes = process.env.HASH_ROUNDS as unknown as number;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  sex: {
    type: String,
    enum: ["male", "femal"],
  },
  photo: {
    type: String,
  },
  addresses: [
    {
      street: String,
      city: String,
      country: String,
    },
  ],
  about: {
    type: String,
  },
  education: [
    {
      school: String,
      degree: String,
      fieldOfStudy: String,
      from: Date,
      to: Date,
    },
  ],
  experience: [
    {
      company: String,
      position: String,
      from: Date,
      to: Date,
    },
  ],
  skills: [
    {
      skill: {
        type: String,
        enum: [
          "HTML",
          "CSS",
          "JavaScript",
          "NodeJS",
          "ReactJS",
          "MongoDB",
          "MySQL",
          // edit this to add more skills from api
        ],
      },
      level: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
      },
    },
  ],
  currentWork: {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companys",
    },
    position: String,
    from: Date,
    to: Date,
  },
  resume: {
    type: String,
  },
  followedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  followedCompanies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companys",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  role: {
    type: String,
    enum: ["normal", "premium", "admin"],
    default: "normal",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, hashRoundes, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  } else {
    next();
  }
});

const User = mongoose.model("users", userSchema);

export default User;
