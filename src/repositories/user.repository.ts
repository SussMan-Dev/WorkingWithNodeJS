import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { connectDB } from "../config/db.js";
import type { User } from "../models/userModel.js";

interface UserRow extends User, RowDataPacket { }

async function findUserByUsername(username: string): Promise<boolean> {
    const db = await connectDB();

    const [rows] = await db.execute<UserRow[]>(
        "SELECT * FROM users WHERE username = ? LIMIT 1",
        [username]
    );

    return rows.length > 0;
}

async function findAll(): Promise<User[]> {
    const db = await connectDB();
    const [rows] = await db.execute<UserRow[]>("SELECT * FROM users");
    return rows;
}

async function create(user: User): Promise<void> {
    const db = await connectDB()
    const [result] = await db.execute<ResultSetHeader>("INSERT INTO users (username, password) VALUES (?, ?)",
        [user.username, user.password])
}
export { findAll, findUserByUsername, create };
