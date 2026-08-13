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

const findUser = async (id: number) => {
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

const createUser = async (username: string, password: string, dateOfBirth: Date) => {
    const newUser = await prisma.user.create({
        data: {
            username: username,
            password: password,
            dateOfBirth: dateOfBirth
        }
    })
    return newUser;
}

const updateUser = async (id: number, username: string, password: string) => {
    const updatedUser = await prisma.user.update(
        {
            where: {
                userId: id
            },
            data: {
                username: username,
                password: password,
            }
        }
    )
    return updatedUser
}

const deleteById = async (id: number) => {
    const deletedUser = await prisma.user.delete({
        where: { userId: id }
    })
    return deletedUser
}

const searchUserByUserName = async (keyword: string) => {
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
                contains: keyword,
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
// , createUser, findUser, updateUser, deleteById, searchUserByUserName
export { findAllUsers, searchUserByUserName, findUser, updateUser, createUser };
