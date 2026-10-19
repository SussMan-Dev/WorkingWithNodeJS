import type { Express } from "express";
import { handleCreateRole, handleDeleteRole, handleGetRoles, handleSetRole, handleUpdateRole } from "../controllers/role.controller.js";

const registerRoleRoute = (app: Express): void => {
    app.get("/api/v1/roles", handleGetRoles);
    app.post("/api/v1/roles", handleCreateRole);
    app.patch("/api/v1/roles/:id", handleUpdateRole);
    app.put("/api/users/:userId/role/:roleId", handleSetRole);
    app.delete("/api/v1/roles/:id", handleDeleteRole);
    
};

export { registerRoleRoute };
