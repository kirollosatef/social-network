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
app.get("/follow/:id/:userId", userController.followUser);
app.get("/unfollow/:id/:userId", userController.unfollowUser);
app.put("/update/:id", userController.updateUser);
app.delete("/delete/:id", userController.deleteUser);
app.delete("/deleteSkill/:id/:skillId", userController.deleteSkill);
app.delete("/deleteExperience/:id/:experienceId", userController.deleteExperience);
app.delete("/deleteEducation/:id/:educationId", userController.deleteEducation);
app.delete("/deleteAddress/:id/:addressId", userController.deleteAddress);

export default app;
