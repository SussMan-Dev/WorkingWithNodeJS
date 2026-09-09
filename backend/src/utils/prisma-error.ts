import { Prisma } from "../generated/prisma/client.js";

const isUniqueConstraintError = (
    error: unknown,
): error is Prisma.PrismaClientKnownRequestError => {
    return error instanceof Prisma.PrismaClientKnownRequestError
        && error.code === "P2002";
};

export { isUniqueConstraintError };
