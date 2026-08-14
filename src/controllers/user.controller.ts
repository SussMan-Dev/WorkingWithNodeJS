// import { create, edit, getAllUsers, getUserForEdit, remove, searchUser } from "../services/user.service.js"
import { type Request, type Response } from "express";
import { create, edit, findUser, getAllUsers, getUser, remove, searchUser } from "../services/user.service.js";
import { log } from "console";

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

    if (Number.isNaN(birthDate.getTime())) {
        return res.status(400).render("user/create", {
            error: "Ngày sinh không hợp lệ",
            username,
        });
    }
    if (!username || !dateOfBirth || !password || !confirmPassword) {
        return res.status(400).render("user/create", {
            error: "Please enter all required information",
            username,
        });
    }

    if (password !== confirmPassword) {
        return res.status(400).render("user/create", {
            error: "Password and confirm password must be same",
            username,
        });
    }
    console.log(req.body);
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

const handleEditUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = await getUser(id);
    const { username, password, confirmPassword } = req.body;
    //validate
    if (Number.isNaN(id)) {
        return res.status(400).send("Invalid user ID");
    }

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

    try {
        await edit(id, username.trim(), password);
        return res.redirect("/users");
    } catch (error) {
        res.status(500).render("user/edit", {
            error: "Unable to edit user. Please try again.",
            user,
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

export { renderUserList, renderCreateUserForm, handleEditUser, handleGetUsers, handleGetUser, handleCreateUser, renderEditForm, handleDeleteUser }