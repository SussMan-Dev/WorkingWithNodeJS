import prisma from "../config/db.js";
import type { User } from "../models/userModel.js";

const findAllUsers = async (): Promise<User[]> => {
    const users = await prisma.user.findMany()
    return users
};

const findUser = async (id: number): Promise<User> => {
    const user = await prisma.user.findUniqueOrThrow(
        { where: { userId: id } }
    )
    return user
}

const createUser = async (username: string, password: string): Promise<User> => {
    const newUser = await prisma.user.create({
        data: {
            username: username,
            password: password,
        }
    })
    return newUser;
}

const updateUser = async (id: number, username: string, password: string): Promise<User> => {
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

const deleteById = async (id: number): Promise<User> => {
    const deletedUser = await prisma.user.delete({
        where: { userId: id }
    })
    return deletedUser
}

const searchUserByUserName = async (keyword: string): Promise<User[]> => {
    const users = await prisma.user.findMany({
        where: {
            username: {
                contains: keyword,
            }
        }
    })
    return users
}

export { findAllUsers, createUser, findUser, updateUser, deleteById, searchUserByUserName };
