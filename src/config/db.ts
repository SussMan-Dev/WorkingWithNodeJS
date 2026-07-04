import mysql from "mysql2/promise";
async function connectDB() {
    const db = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "123456",
        database: "ticketmanagement"
    });
    console.log("Connected to MySQL database");
    return db;
}
export { connectDB }