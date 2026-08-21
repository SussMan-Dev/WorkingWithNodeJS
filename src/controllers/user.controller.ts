// import { create, edit, getAllUsers, getUserForEdit, remove, searchUser } from "../services/user.service.js"
import { type Request, type Response } from "express";
import { create, findUser, getAllUsers, getUser, remove, searchUser, update } from "../services/user.service.js";

//Render UI
const renderUserList = async (req: Request, res: Response): Promise<void> => {
    const keyword = req.query.keyword as string;
    try {
        let users = keyword ? await searchUser(keyword) : await getAllUsers();
        res.render("user/userList.ejs", {
            users,
            keyword,
        });
    }
    catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

const renderCreateUserForm = (req: Request, res: Response) => {
    try {
        res.status(200).render("user/create")
    }
    catch {
        res.status(500).json("Internal Server Error")
    }
}

const renderEditForm = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const user = await getUser(id)
        res.status(200).render("user/edit", { user })
    }
    catch {
        res.status(500).json("Internal Server Error")
    }
}

// Logic
const handleGetUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers()
        res.status(200).send(users)
    }
    catch {
        res.status(500).json("Internal Server Error")
    }

}

const handleGetUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const user = await findUser(id)
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
        return res.status(400).render("user/create", {
            error: "Please enter all required information",
            username,
            password,
            dateOfBirth,
            confirmPassword
        });
    }
    if (Number.isNaN(birthDate.getTime())) {
        return res.status(400).render("user/create", {
            error: "Your birthday is invalid",
            username,
            password,
            confirmPassword
        });
    }


    if (password !== confirmPassword) {
        return res.status(400).render("user/create", {
            error: "Password and confirm password must be same",
            username,
            dateOfBirth,
        });
    }
    try {
        await create(username.trim(), password, birthDate);
        return res.redirect("/users");
    } catch {


        return res.status(500).render("user/create", {
            error: "Unable to create user. Username may already exist.",
            username,
        });
    }
};

const handleDeleteUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        await remove(id);

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
        await update(id, username, password, birthDate)
        return res.status(200).json({
            error: "User updated successfully"
        });
    }
    catch (err) {
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
}
export { renderUserList, renderCreateUserForm, handleGetUsers, handleGetUser, handleCreateUser, renderEditForm, handleDeleteUser, handleUpdateUser }