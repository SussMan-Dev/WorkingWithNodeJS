import { Response, Request } from "express";

const getUserData = (req: Request, res: Response) => {
    return res.render("user/userList.ejs")
}
const getCreateUserForm = (req: Request, res: Response) => {
    return res.render("user/createUser.ejs")
}
const createUser = (req: Request, res: Response) => {
    console.log("Check data", req.body);
    return res.redirect("/users");
}
export { getUserData, createUser, getCreateUserForm }
