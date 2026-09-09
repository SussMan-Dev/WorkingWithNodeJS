import { type Request, type Response } from "express";
import { verifyUser } from "../services/password.service.js";
import { create } from "../services/user.service.js";
import { isUniqueConstraintError } from "../utils/prisma-error.js";

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
    const normalizedUsername = typeof username === "string" ? username.trim() : "";
    const birthDate = new Date(dateOfBirth)
    if (!normalizedUsername || !dateOfBirth || Number.isNaN(birthDate.getTime()) || !password || !confirmPassword) {
        return res.status(400).render("auth/register", {
            error: "Must enter valid information in all required fields",
            username: normalizedUsername,
            dateOfBirth,
        })
    }
    if (password !== confirmPassword) {
        return res.status(400).render("auth/register", {
            error: "Password and confirm password must be the same",
            username: normalizedUsername,
            dateOfBirth,
        })
    }

    try {
        await create(normalizedUsername, password, birthDate)
        return res.redirect("/auth/login")
    } catch (error) {
        if (isUniqueConstraintError(error)) {
            return res.status(409).render("auth/register", {
                error: "Username already exists",
                username: normalizedUsername,
                dateOfBirth,
            });
        }

        console.error("Register failed:", error)
        return res.status(500).json("Unable to create user")
    }
}
export { getRegisterForm, getLoginForm, handleLogin, handleRegister }
