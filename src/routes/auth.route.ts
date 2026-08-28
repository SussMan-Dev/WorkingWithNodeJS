import type { Express } from "express";
import { getLoginForm, getRegisterForm, handleLogin } from "../controllers/auth.controller.js";
const registerAuthRoute = (app: Express): void => {
    app.get("/auth/register", getRegisterForm)
    app.get("/auth/login", getLoginForm)

    app.post("/auth/login", handleLogin)
}
export { registerAuthRoute, getLoginForm }