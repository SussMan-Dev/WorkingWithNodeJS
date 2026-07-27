import type { RowDataPacket } from "mysql2";
import { connectDB } from "../config/db.js";
import type { User } from "../models/userModel.js";

type UserRow = User & RowDataPacket;

const findAllUsers = async (): Promise<User[]> => {
    const db = await connectDB();
    try {
        const [rows] = await db.execute<UserRow[]>("SELECT * FROM users");
        return rows;
    }
    finally {
        await db.end()
    }


};

export { findAllUsers };
