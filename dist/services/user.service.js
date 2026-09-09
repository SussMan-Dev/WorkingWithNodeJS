// import { createUser, deleteById, findAllUsers, findUser, searchUserByUserName, updateUser } from "../repositories/user.repository.js";
import { createUser, deleteById, findAllUsers, findUser, searchUserByUserName, updateUser } from "../repositories/user.repository.js";
import { hashPassword } from "./password.service.js";
const getAllUsers = () => {
    return findAllUsers();
};
const getUser = (id) => {
    return findUser(id);
};
const create = async (username, password, dateOfBirth) => {
    const hashedPassword = await hashPassword(password);
    return createUser(username, hashedPassword, dateOfBirth);
};
const searchUser = (username) => {
    return searchUserByUserName(username);
};
const update = async (id, username, password, dateOfBirth) => {
    const hashedPassword = await hashPassword(password);
    return updateUser(id, username, hashedPassword, dateOfBirth);
};
const remove = (id) => {
    return deleteById(id);
};
// , create, getUserForEdit, edit, remove, searchUser
export { getAllUsers, searchUser, findUser, getUser, create, remove, update };
//# sourceMappingURL=user.service.js.map