import prisma from "../config/db.js";

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
            roleName: true
        },
        where: {
            roleName: {
                contains: keyword.trim(),
            },
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
export { findAllRoles, insertRole, findRolesByName, updateRoleById }
