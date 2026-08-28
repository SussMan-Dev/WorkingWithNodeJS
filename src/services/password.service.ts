import * as argon2 from "argon2";
import { validateUser } from "../repositories/auth.repository.js";
const hashPassword = async (plainPassword: string): Promise<string> => {
    return argon2.hash(plainPassword, {
        // config argon2id attribute
        type: argon2.argon2id,
        memoryCost: 65536,
        timeCost: 3,
        parallelism: 4,
    })
}
const verifyUser = async (username: string, password: string): Promise<boolean> => {
    return await validateUser(username, password)
}
export { hashPassword, verifyUser }