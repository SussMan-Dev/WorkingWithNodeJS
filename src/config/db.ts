import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "123456",
    database: "ticketmanagement"
});

const prisma = new PrismaClient({ adapter });
export default prisma;