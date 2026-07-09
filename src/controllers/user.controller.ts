import { Response, Request } from "express";
import { getUsers, createUser as createUserService } from "../services/user.service.js";

const getUserData = async (req: Request, res: Response) => {
    const users = await getUsers()
    return res.render("user/userList.ejs", { users })
}
const showCreateUserForm = (req: Request, res: Response) => {
    return res.render("user/createUser.ejs")
}
const createUser = (req: Request, res: Response) => {
    const { username, password } = req.body
    createUserService(username, password)
    return res.redirect("/users");
}
export { getUserData, createUser, showCreateUserForm }
