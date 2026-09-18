import {
    deleteUserById,
    findAllUsers,
    findUserById,
    findUsersByUsername,
    insertUser,
    updateUserById,
} from "../repositories/user.repository.js";
import { hashPassword } from "./password.service.js";


const getUsers = () => {
    return findAllUsers();
};

const getUserById = (id: number) => {
    return findUserById(id)
}

const createUser = async (username: string, password: string, dateOfBirth: Date) => {
    const hashedPassword = await hashPassword(password)
    return insertUser(username, hashedPassword, dateOfBirth)
}

const searchUsersByUsername = (username: string) => {
    return findUsersByUsername(username)
}

const updateUser = async (id: number, username: string, password: string, dateOfBirth: Date) => {
    const hashedPassword = await hashPassword(password)
    return updateUserById(id, username, hashedPassword, dateOfBirth)
}

const deleteUser = (id: number) => {
    return deleteUserById(id)
}

export { getUsers, searchUsersByUsername, getUserById, createUser, deleteUser, updateUser };
