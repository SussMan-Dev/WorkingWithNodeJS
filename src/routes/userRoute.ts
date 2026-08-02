import type { Express } from "express";
import { handleCreateUser, handleDeleteUser, handleEditUser, renderCreateUserForm, renderEditForm, renderUserList } from "../controllers/user.controller.js";

const registerUserRoutes = (app: Express): void => {
    app.get("/users", renderUserList);
    app.get("/users/create", renderCreateUserForm);
    app.post("/users/create", handleCreateUser);
    app.get("/users/edit/:id", renderEditForm);
    app.post("/users/edit/:id", handleEditUser);
    app.post("/users/:id", handleDeleteUser);
};

export { registerUserRoutes };
