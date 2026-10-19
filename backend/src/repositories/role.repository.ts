import prisma from "../config/db.js";
import { findUserById } from "./user.repository.js";

const findAllRoles = async () => {
    const roles = await prisma.role.findMany({
        select: {
            roleId: true,
            roleName: true,
            createdAt: true
        }
    })
    return roles
}

const insertRole = async (name: string) => {
    const newRole = await prisma.role.create({
        data: {
            roleName: name.trim()
        }
    })
    return newRole
}

const findRolesByName = async (keyword: string) => {
    const role = await prisma.role.findMany({
        select: {
            roleId: true,
            roleName: true,
            createdAt: true,
        },
        where: {
            roleName: {
                contains: keyword.trim(),
            },
        },
    });
    return role
}

const findRolesById = async (roleId: number) => {
    const role = await prisma.role.findMany({
        select: {
            roleId: true,
            roleName: true,
            createdAt: true,
        },
        where: {
            roleId: roleId
        },
    });
    return role
}

const updateRoleById = async (id: number, newName: string) => {
    const roleName = newName.trim();

    if (!roleName) {
        return false;
    }

    const result = await prisma.role.updateMany({
        where: {
            roleId: id
        },
        data: {
            roleName
        }
    });

    return result.count > 0;
};

const deleteRoleById = async (id: number) => {
    if (!id) {
        return false
    }
    const result = await prisma.role.delete({
        where: {
            roleId: id
        }
    })
    return result
}

const setRoleById = async(userId: number, roleId: number) => {
    const isRoleExist = await findRolesById(roleId)
    const isUserExist = await findUserById(userId)
    if(!isRoleExist || !isUserExist){
        return false
    }
    const result = await prisma.user.update({
        where: {
            userId : userId
        },
        data: {
            userId: userId,
            roleId : roleId
        }
    })
    return result
}

export { findAllRoles, insertRole, findRolesByName, updateRoleById, deleteRoleById, setRoleById }
