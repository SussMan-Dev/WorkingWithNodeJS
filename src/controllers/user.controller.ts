import { Response, Request } from "express";
import { getUsers, createUser as createUserService } from "../services/user.service.js";

const getUserData = async (req: Request, res: Response) => {
    const users = await getUsers()
    return res.render("user/userList.ejs", { users })
}
const showCreateUserForm = (req: Request, res: Response) => {
    return res.render("user/createUser.ejs")
}
const createUser = async (req: Request, res: Response) => {
    const { username, password, confirmPassword } = req.body

    if (password !== confirmPassword) {
        return res.render("user/createUser.ejs", {
            error: "Passwords do not match",
            username
        });
    }

    const created = await createUserService(username, password)

    if (!created) {
        return res.render("user/createUser.ejs", {
            error: "Username already exists",
            username
        });
    }

    return res.redirect("/users");
}
export { getUserData, createUser, showCreateUserForm }
