import * as argon2 from "argon2";
import { validateUser } from "../repositories/auth.repository.js";
const hashPassword = async (plainPassword) => {
    return argon2.hash(plainPassword, {
        // config argon2id attribute
        type: argon2.argon2id,
        memoryCost: 65536,
        timeCost: 3,
        parallelism: 4,
    });
};
const verifyUser = async (username, password) => {
    return await validateUser(username, password);
};
export { hashPassword, verifyUser };
//# sourceMappingURL=password.service.js.map