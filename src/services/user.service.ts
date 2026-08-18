
// import { createUser, deleteById, findAllUsers, findUser, searchUserByUserName, updateUser } from "../repositories/user.repository.js";
import { createUser, deleteById, findAllUsers, findUser, searchUserByUserName, updateUser } from "../repositories/user.repository.js";
const getAllUsers = () => {
    return findAllUsers();
};

const getUser = async (id: number) => {
    return await findUser(id)
}

const create = async (username: string, password: string, dateOfBirth: Date) => {
    return await createUser(username, password, dateOfBirth)
}


const searchUser = async (username: string) => {
    const users = await searchUserByUserName(username)
    return users
}

const update = async (id: number, username: string, password: string, dateOfBirth: Date) => {
    return await updateUser(id, username, password, dateOfBirth)
}

const remove = async (id: number) => {
    return await deleteById(id)
}
// , create, getUserForEdit, edit, remove, searchUser
export { getAllUsers, searchUser, findUser, getUser, create, remove, update };
