import type { User } from "../models/userModel.js";
import { createUser, findAllUsers, findUser } from "../repositories/user.repository.js";

const getAllUsers = (): Promise<User[]> => {
    return findAllUsers();
};

const create = async (username: string, password: string) => {
    return await createUser(username, password)
}
const getUserForEdit = async (id: number) => {
    return await findUser(id)
}
export { getAllUsers, create, getUserForEdit };
