import prisma from "../config/db.js";

const findAllUsers = async () => {
    const users = await prisma.user.findMany(
        {
            select: {
                userId: true,
                username: true,
                dateOfBirth: true,
                createdAt: true,
                updatedAt: true,
            }
        }
    )
    return users.map((user) => ({
        ...user,
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.toISOString().split("T")[0] : null
    }))
};

const findUserById = async (id: number) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: { userId: id },
        select: {
            userId: true,
            username: true,
            dateOfBirth: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return {
        ...user,
        dateOfBirth: user.dateOfBirth
            ? user.dateOfBirth.toISOString().split("T")[0]
            : null,
    };
}

const insertUser = async (username: string, password: string, dateOfBirth: Date) => {
    const newUser = await prisma.user.create({
        data: {
            username: username,
            password: password,
            dateOfBirth: dateOfBirth,
        }
    })
    return newUser;
}

const updateUserById = async (id: number, username: string, password: string, dateOfBirth: Date) => {
    const updatedUser = await prisma.user.update(
        {
            where: {
                userId: id
            },
            data: {
                username: username,
                password: password,
                dateOfBirth: dateOfBirth,
            }
        }
    )
    return updatedUser
}

const deleteUserById = async (id: number) => {
    const deletedUser = await prisma.user.delete({
        where: { userId: id }
    })
    return deletedUser
}

const findUsersByUsername = async (keyword: string) => {
    const users = await prisma.user.findMany({
        select: {
            userId: true,
            username: true,
            dateOfBirth: true,
            createdAt: true,
            updatedAt: true,
        },
        where: {
            username: {
                contains: keyword.trim(),
            },
        },
    });

    return users.map((user) => ({
        ...user,
        dateOfBirth: user.dateOfBirth
            ? user.dateOfBirth.toISOString().split("T")[0]
            : null,
    }));
};
export {
    findAllUsers,
    findUsersByUsername,
    findUserById,
    updateUserById,
    insertUser,
    deleteUserById,
};
