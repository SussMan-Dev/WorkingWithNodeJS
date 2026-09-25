import { type Request, type Response } from "express";
import { authenticateUser } from "../services/password.service.js";
import { createUser } from "../services/user.service.js";
import { isUniqueConstraintError } from "../utils/prisma-error.js";

const handleLogin = async (req: Request, res: Response) => {
    const username = typeof req.body.username === "string" ? req.body.username.trim() : "";
    const password = typeof req.body.password === "string" ? req.body.password : "";

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const isValid = await authenticateUser(username, password);

        if (!isValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Login failed:", error);
        return res.status(500).json({ message: "Unable to log in" });
    }
};

const handleRegister = async (req: Request, res: Response) => {
    const { username, dateOfBirth, password, confirmPassword } = req.body;
    const normalizedUsername = typeof username === "string" ? username.trim() : "";
    const normalizedPassword = typeof password === "string" ? password : "";
    const normalizedConfirmation = typeof confirmPassword === "string" ? confirmPassword : "";
    const birthDate = new Date(dateOfBirth);

    if (!normalizedUsername || !dateOfBirth || Number.isNaN(birthDate.getTime()) || !normalizedPassword || !normalizedConfirmation) {
        return res.status(400).json({ message: "Enter valid information in all required fields" });
    }

    if (normalizedPassword !== normalizedConfirmation) {
        return res.status(400).json({ message: "Password and confirmation must match" });
    }

    try {
        await createUser(normalizedUsername, normalizedPassword, birthDate);
        return res.status(201).json({ message: "Account created successfully" });
    } catch (error) {
        if (isUniqueConstraintError(error)) {
            return res.status(409).json({ message: "Username already exists" });
        }

        console.error("Register failed:", error);
        return res.status(500).json({ message: "Unable to create account" });
    }
};

export { handleLogin, handleRegister };
