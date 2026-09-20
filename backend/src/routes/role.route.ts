import type { Express } from "express";
import { handleCreateRole, handleDeleteRole, handleGetRole, handleUpdateRole, renderRoleList } from "../controllers/role.controller.js";
const registerRoleRoute = async (app: Express) => {
    app.get("/roles", renderRoleList)

    app.get("/api/v1/role", handleGetRole)
    app.post("api/v1/role", handleCreateRole)
    app.patch("api/v1/role", handleUpdateRole)
    app.delete("/api/v1/role/:id", handleDeleteRole);
}
export { registerRoleRoute }