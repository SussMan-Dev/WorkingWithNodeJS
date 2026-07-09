import { Express } from "express";
import express from "express"
import { createUser, showCreateUserForm, getUserData } from "../controllers/user.controller.js";
const userRoute = express.Router()

export default function userRoutes(app: Express) {
    userRoute.get("/", getUserData)
    userRoute.get("/createUser", showCreateUserForm)
    userRoute.post("/createUser", createUser)
    app.use("/users", userRoute)
}
