import argon2 from "argon2";
import prisma from "../config/db.js";
const validateUser = async (usernameInput, passwordInput) => {
    const user = await prisma.user.findFirst({
        where: {
            username: usernameInput
        }
    });
    if (!user) {
        return false;
    }
    return await argon2.verify(user.password, passwordInput);
};
export { validateUser };
//# sourceMappingURL=auth.repository.js.map