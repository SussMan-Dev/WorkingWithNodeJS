import type { User } from "../models/userModel.js";
import { findAll, findUserByUsername, create } from "../repositories/user.repository.js";

async function getUsers(): Promise<User[]> {
    return findAll();
}

async function createUser(username: string, password: string) {
    if (await findUserByUsername(username)) {
        return
    }
    else {
        const user = { username: username, password: password }
        await create(user)
    }
}
export { getUsers, createUser };
