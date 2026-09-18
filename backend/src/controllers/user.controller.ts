import { type Request, type Response } from "express";
import {
    createUser,
    deleteUser,
    getUserById,
    getUsers,
    searchUsersByUsername,
    updateUser,
} from "../services/user.service.js";
import { isUniqueConstraintError } from "../utils/prisma-error.js";

//Render UI
const renderUserList = async (req: Request, res: Response): Promise<void> => {
    const keyword = req.query.keyword as string;
    try {
        const users = keyword ? await searchUsersByUsername(keyword) : await getUsers();
        res.render("admin/user/userList", {
            users,
            keyword,
        });
    }
    catch (error) {
        console.error("Unable to render user list:", error);
        res.status(500).send("Internal Server Error");
    }
};

const renderCreateUserForm = (_req: Request, res: Response) => {
    try {
        res.status(200).render("admin/user/create")
    }
    catch {
        res.status(500).json("Internal Server Error")
    }
}

const renderEditUserForm = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const user = await getUserById(id)
        res.status(200).render("admin/user/edit", { user })
    }
    catch {
        res.status(500).json("Internal Server Error")
    }
}

// Logic
const handleGetUsers = async (_req: Request, res: Response) => {
    try {
        const users = await getUsers()
        res.status(200).send(users)
    }
    catch {
        res.status(500).json("Internal Server Error")
    }

}

const handleGetUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const user = await getUserById(id)
        res.status(200).send(user)
    }
    catch {
        res.status(500).json("Internal Server Error")
    }

}

const handleCreateUser = async (req: Request, res: Response) => {

    const { username, password, dateOfBirth, confirmPassword } = req.body;
    const birthDate = new Date(dateOfBirth);
    if (!username || !dateOfBirth || !password || !confirmPassword) {
        return res.status(400).render("admin/user/create", {
            error: "Please enter all required information",
            username,
            password,
            dateOfBirth,
            confirmPassword
        });
    }
    if (Number.isNaN(birthDate.getTime())) {
        return res.status(400).render("admin/user/create", {
            error: "Your birthday is invalid",
            username,
        });
    }


    if (password !== confirmPassword) {
        return res.status(400).render("admin/user/create", {
            error: "Password and confirm password must be same",
            username,
        });
    }
    try {
        await createUser(username.trim(), password, birthDate);
        return res.redirect("/users");
    } catch (error) {
        if (isUniqueConstraintError(error)) {
            return res.status(409).render("admin/user/create", {
                error: "Username already exists",
                username,
                dateOfBirth,
            });
        }

        return res.status(500).render("admin/user/create", {
            error: "Unable to create user",
            username,
        });
    }
};

const handleDeleteUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        await deleteUser(id);

        return res.status(204).send();
    } catch (err) {
        return res.status(500).json({
            error: "Unable to delete user. Please try again.",
        });
    }
};

const handleUpdateUser = async (req: Request, res: Response) => {
    const { username, dateOfBirth, password, confirmPassword } = req.body
    if (!username.trim() || !dateOfBirth || !password || !confirmPassword) {
        return res.status(400).json({
            error: "Please enter all required information"
        });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({
            error: "Password and confirm password must be the same"
        });
    }
    try {
        const birthDate = new Date(dateOfBirth);
        const id = Number(req.params.id)
        await updateUser(id, username, password, birthDate)
        return res.status(200).json({
            error: "User updated successfully"
        });
    }
    catch (error) {
        if (isUniqueConstraintError(error)) {
            return res.status(409).json({
                error: "Username already exists"
            });
        }

        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
}
export {
    renderUserList,
    renderCreateUserForm,
    handleGetUsers,
    handleGetUser,
    handleCreateUser,
    renderEditUserForm,
    handleDeleteUser,
    handleUpdateUser,
}
