import { Router } from "express";
import userController from "../../controllers/user/user.controller";

const app = Router();

app.post("/create", userController.addUser);
app.post("/addSkill/:id", userController.addSkill);
app.post("/addExperience/:id", userController.addExperience);
app.post("/addEducation/:id", userController.addEducation);
app.post("/addAddress/:id", userController.addAddress);
app.get("/list", userController.listUsers);
app.get("/list/:name", userController.listByName);
app.get("list/:id", userController.getUserById);

export default app;
