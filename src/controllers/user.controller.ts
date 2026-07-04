import { Response, Request } from "express";
import { getAllUsers } from "../services/user.service.js";

const getUserData = async (req: Request, res: Response) => {
    const users = await getAllUsers()
    return res.render("user/userList.ejs", { users })
}
const getCreateUserForm = (req: Request, res: Response) => {
    return res.render("user/createUser.ejs")
}
const createUser = (req: Request, res: Response) => {
    const { name, email, age } = req.body
    console.log("Check data", req.body);
    return res.redirect("/users");
}
export { getUserData, createUser, getCreateUserForm }
