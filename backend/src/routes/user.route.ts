import type { Express } from "express";
import { handleGetUsers, handleGetUser, handleCreateUser, handleDeleteUser, handleUpdateUser } from "../controllers/user.controller.js";

const registerUserRoutes = (app: Express): void => {
    app.get("/api/v1/users", handleGetUsers);
    app.get("/api/v1/users/:id", handleGetUser);
    app.post("/api/v1/users", handleCreateUser);
    app.patch("/api/v1/users/:id", handleUpdateUser);
    app.delete("/api/v1/users/:id", handleDeleteUser);
};

export { registerUserRoutes };
