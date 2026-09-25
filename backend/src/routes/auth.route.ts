import type { Express } from "express";
import { handleLogin, handleRegister } from "../controllers/auth.controller.js";

const registerAuthRoute = (app: Express): void => {
    app.post("/api/v1/auth/register", handleRegister);
    app.post("/api/v1/auth/login", handleLogin);
};

export { registerAuthRoute };
