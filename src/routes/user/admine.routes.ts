import Router from "express";
import userController from "../../controllers/user/admin.controller";

const app = Router();

app.delete("/:id", userController.deleteUser);
app.get("/:id/:years", userController.getUserByExperience);

export default app;
