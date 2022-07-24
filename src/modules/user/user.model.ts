import { Document, Types, Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const hashRoundes = process.env.HASH_ROUNDS as unknown as number;
const bcryptPassword = process.env.BCRYPT_PASSWORD as unknown as string;
enum skills {
  "HTML",
  "CSS",
  "JavaScript",
}
enum levels {
  "beginner",
  "intermediate",
  "advanced",
}

interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  phone: string;
  sex: string;
  photo: string;
  addresses: [{ street: string; city: string; country: string }];
  about: string;
  educations: [
    {
      school: string;
      degree: string;
      fieldOfStudy: string;
      from: Date;
      to: Date;
    }
  ];
  experiences: [
    {
      company: string;
      position: string;
      from: Date;
      to: Date;
    }
  ];
  skills: [
    {
      name: skills;
      level: levels;
    }
  ];
  currentWork: {
    company: Types.ObjectId;
    position: string;
    from: Date;
    to: Date;
  };
  resume: string;
  following: [Types.ObjectId];
  followedCompanies: [Types.ObjectId];
  followers: [Types.ObjectId];
  role: string;
  isActive: boolean;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
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
    enum: ["male", "female"],
  },
  photo: String,
  addresses: [
    {
      street: String,
      city: String,
      country: String,
    },
  ],
  about: String,
  educations: [
    {
      school: String,
      degree: String,
      fieldOfStudy: String,
      from: Date,
      to: Date,
    },
  ],
  experiences: [
    {
      company: String,
      position: String,
      from: Date,
      to: Date,
    },
  ],
  skills: [
    {
      name: {
        type: String,
        enum: Object.values(skills),
      },
      level: {
        type: String,
        enum: Object.values(levels),
      },
    },
  ],
  currentWork: {
    company: {
      type: Schema.Types.ObjectId,
      ref: "companys",
    },
    position: String,
    from: Date,
    to: Date,
  },
  resume: String,
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  followedCompanies: [
    {
      type: Schema.Types.ObjectId,
      ref: "companys",
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  role: {
    type: String,
    enum: ["user", "premium", "admin"],
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

// hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(
      this.password + bcryptPassword,
      hashRoundes
    );
  }
  next();
});

const User = model("users", userSchema);

export default User;
