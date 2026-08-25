import * as argon2 from "argon2";
const hashPassword = async (plainPassword: string): Promise<string> => {
    return argon2.hash(plainPassword, {
        // config argon2id attribute
        type: argon2.argon2id,
        memoryCost: 65536,
        timeCost: 3,
        parallelism: 4,
    })
}
const verifyPassword = async (hashedPassword: string, plainPassword: string): Promise<boolean> => {
    return argon2.verify(hashedPassword, plainPassword)
}
export { hashPassword, verifyPassword }