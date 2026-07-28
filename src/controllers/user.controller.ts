import { User } from "../models/userModel.js"
import { create, getAllUsers } from "../services/user.service.js"
import type { Request, Response } from "express";

const renderUserList = async (req: Request, res: Response): Promise<void> => {
    try {
        const users: User[] = await getAllUsers();
        res.render("user/userList.ejs", { users });
    } catch (error) {
        throw error
    }
};

const renderCreateUserForm = (req: Request, res: Response) => {
    res.render("user/createUser.ejs")
}

const handleCreateUser = (req: Request, res: Response) => {
    const { username, password, confirmPassword } = req.body;
    if (!username) {
        res.status(400).render("user/createUser.ejs", {
            error: "Please enter username", username
        })
        return
    }
    if (!password || !confirmPassword) {
        res.status(400).render("user/createUser.ejs", {
            error: "Please enter password and confirm password", username
        })
        return
    }
    if (password !== confirmPassword) {
        res.status(400).render("user/createUser.ejs", {
            error: "confirm password must be the same with password",
            username
        });
        return;
    }
    create(username, password)
    res.redirect("/users");
}

export { renderUserList, renderCreateUserForm, handleCreateUser }