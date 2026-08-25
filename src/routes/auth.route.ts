import type { Express } from "express";
import { getLoginForm, getRegisterForm } from "../controllers/auth.controller.js";
const registerAuthRoute = (app: Express): void => {
    app.get("/register", getRegisterForm)
    app.get("/login", getLoginForm)
}
export { registerAuthRoute, getLoginForm }