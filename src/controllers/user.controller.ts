import type { Request, Response } from "express";
import { getAllUsers } from "../services/user.service.js";

const renderUserList = async (_req: Request, res: Response): Promise<void> => {
    const users = await getAllUsers();
    res.render("user/userList.ejs", { users });
};

export { renderUserList };
