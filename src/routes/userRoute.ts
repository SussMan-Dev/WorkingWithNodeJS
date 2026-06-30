import { Express } from "express";
import express from "express"
const userRoute = express.Router()

export default function userRoutes(app: Express) {
    userRoute.get("/", (req, res) => {
        res.send("this is user Route2!")
    })
    app.use("/users", userRoute)
}
