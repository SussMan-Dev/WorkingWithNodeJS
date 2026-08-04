import { User } from "../models/userModel.js"
import { create, edit, getAllUsers, getUserForEdit, remove, searchUser } from "../services/user.service.js"
import type { Request, Response } from "express";

const renderUserList = async (req: Request, res: Response): Promise<void> => {
    const keyword = req.query.keyword as string
    let users: User[]
    if (keyword) {
        users = await searchUser(keyword);
        res.render("user/userList.ejs", { users })
    }
    else {
        users = await getAllUsers();
        res.render("user/userList.ejs", { users })
    }
};

const renderCreateUserForm = (_req: Request, res: Response) => {
    res.render("user/create")
}

const handleCreateUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { username, password, confirmPassword } = req.body;

    if (!username?.trim() || !password || !confirmPassword) {
        res.status(400).render("user/create", {
            error: "Please enter all required information",
            username
        });
        return;
    }

    if (password !== confirmPassword) {
        res.status(400).render("user/create", {
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

        res.status(500).render("user/create", {
            error: "Unable to create user. Please try again.",
            username
        });
    }
};

const renderEditForm = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if (!Number.isInteger(id) || id <= 0) {
        res.status(400).send("Invalid Id");
        return;
    }
    try {
        const user = await getUserForEdit(id);
        if (!user) {
            res.status(400).send("not found");
            return;
        }
        res.render("user/edit", { user })
        return
    }
    catch (error) { throw error }
}

const handleEditUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = await getUserForEdit(id);
    const { username, password, confirmPassword } = req.body;

    if (!username || !password || !confirmPassword) {
        return res.status(400).render("user/edit", {
            error: "Please enter all required information",
            user
        });
    }

    if (password !== confirmPassword) {
        return res.status(400).render("user/edit", {
            error: "Confirm password must match password",
            user,
        });
    }

    if (Number.isNaN(id)) {
        return res.status(400).send("Invalid user ID");
    }

    try {
        await edit(id, username.trim(), password);
        return res.redirect("/users");
    } catch (error) {
        console.error("Failed to edit user:", error);

        return res.status(500).render("user/edit", {
            error: "Unable to edit user. Please try again.",
            user,
        });
    }
};

const handleDeleteUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        await remove(id)
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
    finally {
        res.redirect("/users")
    }

}

export { renderUserList, renderCreateUserForm, handleCreateUser, renderEditForm, handleEditUser, handleDeleteUser }