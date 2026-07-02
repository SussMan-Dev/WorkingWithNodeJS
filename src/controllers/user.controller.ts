import { Response, Request } from "express";

const getUserData = (req: Request, res: Response) => {
    return res.render("user/userList.ejs")
}
const createUser = (req: Request, res: Response) => {
    return res.render("user/createUser.ejs")
}
export { getUserData, createUser }