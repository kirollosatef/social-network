import userRouter from "./user/user.routes";
import { Router } from "express";

const app = Router();

app.use("/api/v1/user", userRouter);

export default app;
