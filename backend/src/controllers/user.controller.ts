import { type Request, type Response } from "express";
import {
    createUser,
    deleteUser,
    getUserById,
    getUsers,
    searchUsersByUsername,
    updateUser,
} from "../services/user.service.js";
import { isUniqueConstraintError } from "../utils/prisma-error.js";

const parseId = (value: unknown): number | null => {
    if (typeof value !== "string") {
        return null;
    }

    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
};

const handleGetUsers = async (req: Request, res: Response) => {
    try {
        const keyword = typeof req.query.keyword === "string" ? req.query.keyword.trim() : "";
        const users = keyword ? await searchUsersByUsername(keyword) : await getUsers();
        return res.status(200).json({ data: users });
    } catch (error) {
        console.error("Unable to get users:", error);
        return res.status(500).json({ message: "Unable to get users" });
    }
};

const handleGetUser = async (req: Request, res: Response) => {
    const id = parseId(req.params.id);

    if (!id) {
        return res.status(400).json({ message: "Invalid user id" });
    }

    try {
        const user = await getUserById(id);
        return res.status(200).json({ data: user });
    } catch (error) {
        console.error(`Unable to get user ${id}:`, error);
        return res.status(404).json({ message: "User not found" });
    }
};

const handleCreateUser = async (req: Request, res: Response) => {
    const { username, password, dateOfBirth, confirmPassword } = req.body;
    const normalizedUsername = typeof username === "string" ? username.trim() : "";
    const normalizedPassword = typeof password === "string" ? password : "";
    const normalizedConfirmation = typeof confirmPassword === "string" ? confirmPassword : "";
    const birthDate = new Date(dateOfBirth);

    if (!normalizedUsername || !dateOfBirth || !normalizedPassword || !normalizedConfirmation) {
        return res.status(400).json({ message: "Enter all required information" });
    }

    if (Number.isNaN(birthDate.getTime())) {
        return res.status(400).json({ message: "Date of birth is invalid" });
    }

    if (normalizedPassword !== normalizedConfirmation) {
        return res.status(400).json({ message: "Password and confirmation must match" });
    }

    try {
        await createUser(normalizedUsername, normalizedPassword, birthDate);
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        if (isUniqueConstraintError(error)) {
            return res.status(409).json({ message: "Username already exists" });
        }

        console.error("Unable to create user:", error);
        return res.status(500).json({ message: "Unable to create user" });
    }
};

const handleDeleteUser = async (req: Request, res: Response) => {
    const id = parseId(req.params.id);

    if (!id) {
        return res.status(400).json({ message: "Invalid user id" });
    }

    try {
        await deleteUser(id);
        return res.status(204).send();
    } catch (error) {
        console.error(`Unable to delete user ${id}:`, error);
        return res.status(500).json({ message: "Unable to delete user" });
    }
};

const handleUpdateUser = async (req: Request, res: Response) => {
    const id = parseId(req.params.id);
    const { username, dateOfBirth, password, confirmPassword } = req.body;
    const normalizedUsername = typeof username === "string" ? username.trim() : "";
    const normalizedPassword = typeof password === "string" ? password : "";
    const normalizedConfirmation = typeof confirmPassword === "string" ? confirmPassword : "";
    const birthDate = new Date(dateOfBirth);

    if (!id) {
        return res.status(400).json({ message: "Invalid user id" });
    }

    if (!normalizedUsername || !dateOfBirth || !normalizedPassword || !normalizedConfirmation) {
        return res.status(400).json({ message: "Enter all required information" });
    }

    if (Number.isNaN(birthDate.getTime())) {
        return res.status(400).json({ message: "Date of birth is invalid" });
    }

    if (normalizedPassword !== normalizedConfirmation) {
        return res.status(400).json({ message: "Password and confirmation must match" });
    }

    try {
        await updateUser(id, normalizedUsername, normalizedPassword, birthDate);
        return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        if (isUniqueConstraintError(error)) {
            return res.status(409).json({ message: "Username already exists" });
        }

        console.error(`Unable to update user ${id}:`, error);
        return res.status(500).json({ message: "Unable to update user" });
    }
};

export {
    handleGetUsers,
    handleGetUser,
    handleCreateUser,
    handleDeleteUser,
    handleUpdateUser,
};
