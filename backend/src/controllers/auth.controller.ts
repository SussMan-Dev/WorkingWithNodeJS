import { type Request, type Response } from "express";
import { verifyUser } from "../services/password.service.js";
import { create } from "../services/user.service.js";
import { error } from "console";

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

const handleRegister = async (req: Request, res: Response) => {
    const { username, dateOfBirth, password, confirmPassword } = req.body
    const birthDate = new Date(dateOfBirth)
    if (!username.trim() || !birthDate || !password || !confirmPassword) {
        return res.status(200).render("auth/register", {
            error: "must enter all required infomation"
        })
    }
    if (password !== confirmPassword) {
        return res.status(200).render("auth/register", {
            error: "password must be the same with confirm password"
        })
    }

    try {
        await create(username.trim(), password, birthDate)
        return res.redirect("/auth/login")
    } catch (error) {
        console.error("Register failed:", error)
        return res.status(500).json("Unable to create user")
    }
}
export { getRegisterForm, getLoginForm, handleLogin, handleRegister }