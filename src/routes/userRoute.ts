import type { Express } from "express";
import { renderUserList } from "../controllers/user.controller.js";

const registerUserRoutes = (app: Express): void => {
    app.get("/users", renderUserList);
};

export { registerUserRoutes };
