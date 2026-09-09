import { handleGetUsers, renderUserList, renderCreateUserForm, handleGetUser, renderEditForm, handleCreateUser, handleDeleteUser, handleUpdateUser } from "../controllers/user.controller.js";
const registerUserRoutes = (app) => {
    // ==================== PAGE ROUTES ====================
    app.get("/users", renderUserList);
    app.get("/users/create", renderCreateUserForm);
    app.get("/users/edit/:id", renderEditForm);
    // ==================== API ROUTES ====================
    app.get("/api/v1/users", handleGetUsers);
    app.get("/api/v1/users/:id", handleGetUser);
    app.post("/api/v1/users", handleCreateUser);
    app.patch("/api/v1/users/:id", handleUpdateUser);
    app.delete("/api/v1/users/:id", handleDeleteUser);
};
export { registerUserRoutes };
//# sourceMappingURL=user.route.js.map