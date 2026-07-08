import type { RowDataPacket } from "mysql2";
import { connectDB } from "../config/db.js";
import type { User } from "../models/userModel.js";

interface UserRow extends User, RowDataPacket { }

async function findAllUsers(): Promise<User[]> {
    const db = await connectDB();
    const [rows] = await db.execute<UserRow[]>("SELECT * FROM users");
    return rows;
}

async function createUser(): Promise<User[]> {
    const db = await connectDB();
    const [rows] = await db.execute<UserRow[]>("SELECT * FROM users");
    return rows;
}

export { findAllUsers };
