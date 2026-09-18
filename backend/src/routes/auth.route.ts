import type { Express } from "express";
import { renderLoginForm, renderRegisterForm, handleLogin, handleRegister } from "../controllers/auth.controller.js";
const registerAuthRoute = (app: Express): void => {
    app.get("/auth/register", renderRegisterForm)
    app.get("/auth/login", renderLoginForm)

    app.post("/auth/register", handleRegister)
    app.post("/auth/login", handleLogin)
}
export { registerAuthRoute }
