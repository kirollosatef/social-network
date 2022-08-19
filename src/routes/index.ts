import userRouter from "./user/user.routes";
import postRouter from "./post/post.routes";
import commentRouter from "./comment/comment.routes";

import { Router } from "express";

const app = Router();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comment", commentRouter);

export default app;
