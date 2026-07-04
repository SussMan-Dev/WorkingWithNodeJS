import express from "express";
import { createUser, getCreateUserForm, getUserData } from "../controllers/user.controller.js";
const userRoute = express.Router();
export default function userRoutes(app) {
    userRoute.get("/", getUserData);
    userRoute.get("/createUser", getCreateUserForm);
    userRoute.post("/createUser", createUser);
    app.use("/users", userRoute);
}
//# sourceMappingURL=userRoute.js.map