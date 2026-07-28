import { User } from "../models/userModel.js"
import { create, getAllUsers } from "../services/user.service.js"
import type { Request, Response } from "express";

const renderUserList = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users: User[] = await getAllUsers();
        res.render("user/userList.ejs", { users });
    } catch (error) {
        throw error
    }
};

const renderCreateUserForm = (_req: Request, res: Response) => {
    res.render("user/createUser.ejs")
}

const handleCreateUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { username, password, confirmPassword } = req.body;

    if (!username?.trim() || !password || !confirmPassword) {
        res.status(400).render("user/createUser.ejs", {
            error: "Please enter all required information",
            username
        });
        return;
    }

    if (password !== confirmPassword) {
        res.status(400).render("user/createUser.ejs", {
            error: "Confirm password must match password",
            username
        });
        return;
    }

    try {
        await create(username.trim(), password);
        res.redirect("/users");
    } catch (error) {
        console.error("Failed to create user:", error);

        res.status(500).render("user/createUser.ejs", {
            error: "Unable to create user. Please try again.",
            username
        });
    }
};

export { renderUserList, renderCreateUserForm, handleCreateUser }