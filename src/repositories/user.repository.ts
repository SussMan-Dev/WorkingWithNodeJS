import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { connectDB } from "../config/db.js";
import type { User } from "../models/userModel.js";
import { promises } from "node:dns";

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
const findUser = async (id: number) => {
    const db = await connectDB();
    try {
        const [rows] = await db.execute<UserRow[]>("SELECT userId, username, password FROM users WHERE userId = ? ", [id])
        return rows[0] ?? null;
    }
    finally {
        await db.end()
    }
}

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

const updateUser = async (id: number, username: string, password: string) => {
    const db = await connectDB();
    try {
        await db.execute("UPDATE users SET username = ?, password = ? WHERE id = ? ", [username, password, id])
    }
    finally {
        await db.end();
    }
}

export { findAllUsers, createUser, findUser, updateUser };
