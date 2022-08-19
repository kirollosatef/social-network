import commentController from "../../controllers/comment/comment.controller";

import { Router } from "express";

const app = Router();

app.post("/create", commentController.addComment);
app.get("/list", commentController.listComments);
app.put("/update/:id", commentController.updateComment);
app.delete("/delete/:id", commentController.deleteComment);

export default app;
