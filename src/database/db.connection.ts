import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const dbUrl = process.env.DB_URL as string;

const connection = async () => {
  return await mongoose
    .connect(dbUrl)
    .then(() => {
      console.log("Database is connected!!");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connection;
