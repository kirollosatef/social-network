import postController from "../../controllers/post/post.controller";
import { Router } from "express";

const app = Router();

app.post("/create", postController.addPost);
app.get("/list", postController.listPosts);
app.put("/update/:id", postController.updatePost);
app.delete("/delete/:id", postController.deletePost);

export default app;
