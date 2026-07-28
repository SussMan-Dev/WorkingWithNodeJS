import type { ResultSetHeader, RowDataPacket } from "mysql2";
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

const createUser = async (username: string, password: string) => {
    const db = await connectDB();
    try {
        const [result] = await db.execute<ResultSetHeader>("INSERT INTO users (username, password) VALUES(?,?)", [username, password])
        return result.insertId;
    }
    finally {
        await db.end()
    }
}

export { findAllUsers, createUser };
