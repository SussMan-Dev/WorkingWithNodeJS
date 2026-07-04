import type { User } from "../models/userModel.js";
import { findAllUsers } from "../repositories/user.repository.js";

async function getAllUsers(): Promise<User[]> {
    return findAllUsers();
}

export { getAllUsers };
