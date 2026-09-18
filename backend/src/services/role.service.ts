import {
    findAllRoles,
    findRolesByName,
    insertRole,
    updateRoleById,
} from "../repositories/role.repository.js";

const getRoles = () => {
    return findAllRoles();
};

const createRole = (name: string) => {
    return insertRole(name);
};

const searchRolesByName = (keyword: string) => {
    return findRolesByName(keyword);
};

const updateRole = (id: number, newName: string) => {
    return updateRoleById(id, newName);
};

export { getRoles, createRole, searchRolesByName, updateRole };
