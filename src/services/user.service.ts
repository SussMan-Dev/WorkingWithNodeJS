import type { User } from "../models/userModel.js";
import { createUser, deleteById, findAllUsers, findUser, updateUser } from "../repositories/user.repository.js";

const getAllUsers = (): Promise<User[]> => {
    return findAllUsers();
};

const create = async (username: string, password: string) => {
    return await createUser(username, password)
}

const getUserForEdit = async (id: number) => {
    return await findUser(id)
}

const edit = async (id: number, username: string, password: string) => {
    return await updateUser(id, username, password)
}

const remove = async (id: number) => {
    return await deleteById(id)
}
export { getAllUsers, create, getUserForEdit, edit, remove };
