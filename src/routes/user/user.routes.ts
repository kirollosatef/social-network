import { Router } from "express";
import userController from "../../controllers/user/user.controller";

const app = Router();

app.post("/create", userController.addUser);
app.get("/list", userController.getUsers);

export default app;
