import type { User } from "../models/userModel.js";
import { findAll, findUserByUsername, create } from "../repositories/user.repository.js";

const SALT_ROUNDS = 10;

async function getUsers(): Promise<User[]> {
    return findAll();
}

async function createUser(username: string, password: string): Promise<boolean> {
    if (await findUserByUsername(username)) {
        return false
    }
    else {
        const user = { username, password: password }
        await create(user)
        return true
    }
}
export { getUsers, createUser };
