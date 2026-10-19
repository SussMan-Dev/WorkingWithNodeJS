import {
    findAllRoles,
    findRolesByName,
    insertRole,
    setRoleById,
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

const setRole = (userId: number, roleId : number)=>{
    return setRoleById(userId, roleId)
}
export { getRoles, createRole, searchRolesByName, updateRole, setRole };
