
// import { createUser, deleteById, findAllUsers, findUser, searchUserByUserName, updateUser } from "../repositories/user.repository.js";
import { findAllUsers, findUser, searchUserByUserName } from "../repositories/user.repository.js";
const getAllUsers = () => {
    return findAllUsers();
};

// const create = async (username: string, password: string) => {
//     return await createUser(username, password)
// }

const getUserForEdit = async (id: number) => {
    return await findUser(id)
}

// const edit = async (id: number, username: string, password: string) => {
//     return await updateUser(id, username, password)
// }

// const remove = async (id: number) => {
//     return await deleteById(id)
// }

const searchUser = async (username: string) => {
    const users = await searchUserByUserName(username)
    return users
}
// , create, getUserForEdit, edit, remove, searchUser
export { getAllUsers, searchUser, findUser, getUserForEdit };
