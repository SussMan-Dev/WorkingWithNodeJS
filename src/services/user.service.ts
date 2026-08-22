// import { createUser, deleteById, findAllUsers, findUser, searchUserByUserName, updateUser } from "../repositories/user.repository.js";
import { createUser, deleteById, findAllUsers, findUser, searchUserByUserName, updateUser } from "../repositories/user.repository.js";
import { hashPassword } from "./password.service.js";


const getAllUsers = () => {
    return findAllUsers();
};

const getUser = (id: number) => {
    return findUser(id)
}

const create = async (username: string, password: string, dateOfBirth: Date) => {
    const hashedPassword = await hashPassword(password)
    return createUser(username, hashedPassword, dateOfBirth)
}


const searchUser = (username: string) => {
    return searchUserByUserName(username)
}

const update = async (id: number, username: string, password: string, dateOfBirth: Date) => {
    const hashedPassword = await hashPassword(password)
    return updateUser(id, username, hashedPassword, dateOfBirth)
}

const remove = (id: number) => {
    return deleteById(id)
}


// , create, getUserForEdit, edit, remove, searchUser
export { getAllUsers, searchUser, findUser, getUser, create, remove, update };
