import type { User } from "../models/userModel.js";
import { createUser, findAllUsers } from "../repositories/user.repository.js";

const getAllUsers = (): Promise<User[]> => {
    return findAllUsers();
};

const create = (username: string, password: string) => {
    return createUser(username, password)
}
export { getAllUsers, create };
