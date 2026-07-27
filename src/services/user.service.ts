import type { User } from "../models/userModel.js";
import { findAllUsers } from "../repositories/user.repository.js";

const getAllUser = (): Promise<User[]> => {
    return findAllUsers();
};

export { getAllUser };
