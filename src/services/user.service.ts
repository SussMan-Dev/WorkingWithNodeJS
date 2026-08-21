
// import { createUser, deleteById, findAllUsers, findUser, searchUserByUserName, updateUser } from "../repositories/user.repository.js";
import { createUser, deleteById, findAllUsers, findUser, searchUserByUserName, updateUser } from "../repositories/user.repository.js";
const getAllUsers = () => {
    return findAllUsers();
};

const getUser = (id: number) => {
    return findUser(id)
}

const create = (username: string, password: string, dateOfBirth: Date) => {
    return createUser(username, password, dateOfBirth)
}


const searchUser = (username: string) => {
    return searchUserByUserName(username)
}

const update = (id: number, username: string, password: string, dateOfBirth: Date) => {
    return updateUser(id, username, password, dateOfBirth)
}

const remove = (id: number) => {
    return deleteById(id)
}
// , create, getUserForEdit, edit, remove, searchUser
export { getAllUsers, searchUser, findUser, getUser, create, remove, update };
