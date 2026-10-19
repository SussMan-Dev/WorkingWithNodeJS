import { type Request, type Response } from "express";
import { createRole, getRoles, searchRolesByName, setRole, updateRole } from "../services/role.service.js";
import { deleteRoleById } from "../repositories/role.repository.js";
import { isUniqueConstraintError } from "../utils/prisma-error.js";

const handleGetRoles = async (req: Request, res: Response) => {
    try {
        const keyword = typeof req.query.keyword === "string" ? req.query.keyword.trim() : "";
        const roles = keyword ? await searchRolesByName(keyword) : await getRoles();
        return res.status(200).json({ data: roles });
    } catch (error) {
        console.error("Unable to get roles:", error);
        return res.status(500).json({ message: "Unable to get roles" });
    }
};

const handleCreateRole = async (req: Request, res: Response) => {
    const roleName = typeof req.body.roleName === "string"
        ? req.body.roleName.trim()
        : typeof req.body.newRoleName === "string"
            ? req.body.newRoleName.trim()
            : "";

    if (!roleName) {
        return res.status(400).json({ message: "Role name is required" });
    }

    try {
        const role = await createRole(roleName);
        return res.status(201).json({
            message: "Role created successfully",
            data: role,
        });
    } catch (error) {
        if (isUniqueConstraintError(error)) {
            return res.status(409).json({ message: "Role name already exists" });
        }

        console.error("Unable to create role:", error);
        return res.status(500).json({ message: "Unable to create role" });
    }
};

const handleUpdateRole = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const roleName = typeof req.body.roleName === "string"
        ? req.body.roleName.trim()
        : typeof req.body.newRoleName === "string"
            ? req.body.newRoleName.trim()
            : "";

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: "Invalid role id" });
    }

    if (!roleName) {
        return res.status(400).json({ message: "Role name is required" });
    }

    try {
        const updated = await updateRole(id, roleName);

        if (!updated) {
            return res.status(404).json({ message: "Role not found" });
        }

        return res.status(200).json({ message: "Role updated successfully" });
    } catch (error) {
        if (isUniqueConstraintError(error)) {
            return res.status(409).json({ message: "Role name already exists" });
        }

        console.error(`Unable to update role ${id}:`, error);
        return res.status(500).json({ message: "Unable to update role" });
    }
};

const handleDeleteRole = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: "Invalid role id" });
    }

    try {
        await deleteRoleById(id);
        return res.status(204).send();
    } catch (error) {
        console.error(`Unable to delete role ${id}:`, error);
        return res.status(500).json({ message: "Unable to delete role" });
    }
};

const handleSetRole = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    const roleId = Number(req.params.roleId);
    try{
        await setRole(userId, roleId)
        return res.status(200).send()
    }
    catch{
        return res.status(500).json("Unable to set role")
    }
}

export { handleCreateRole, handleGetRoles, handleUpdateRole, handleDeleteRole, handleSetRole };
