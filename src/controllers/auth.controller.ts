import { type Request, type Response } from "express";
import { verifyUser } from "../services/password.service.js";
const getRegisterForm = (req: Request, res: Response) => {
    res.status(200).render("auth/register")
}
const getLoginForm = (req: Request, res: Response) => {
    res.status(200).render("auth/login")
}

const handleLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body
    if (!username.trim() || !password) {
        res.status(400).json("Please enter all required information")
    }
    const isValid = verifyUser(username, password)
    if (await isValid) {
        res.redirect("/users")
    }
}
export { getRegisterForm, getLoginForm, handleLogin }