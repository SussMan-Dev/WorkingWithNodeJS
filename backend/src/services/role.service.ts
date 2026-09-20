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

const updateRole = (id: number, newRoleName: string) => {
    return updateRoleById(id, newRoleName);
};

export { getRoles, createRole, searchRolesByName, updateRole };
