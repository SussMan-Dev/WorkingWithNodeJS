import { type Request, type Response } from "express";
const getRegisterForm = (req: Request, res: Response) => {
    res.status(200).render("auth/register")
}
const getLoginForm = (req: Request, res: Response) => {
    res.status(200).render("auth/login")
}
export { getRegisterForm, getLoginForm }