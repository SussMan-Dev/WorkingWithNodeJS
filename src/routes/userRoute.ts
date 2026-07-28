import type { Express } from "express";
import { handleCreateUser, renderCreateUserForm, renderUserList } from "../controllers/user.controller.js";

const registerUserRoutes = (app: Express): void => {
    app.get("/users", renderUserList);
    app.get("/users/create", renderCreateUserForm);
    app.post("/users/create", handleCreateUser);
};

export { registerUserRoutes };
