import { type Request, type Response } from "express";
import { createRole, getRoles, searchRolesByName, updateRole } from "../services/role.service.js";
import { deleteRoleById } from "../repositories/role.repository.js";

const renderRoleList = async (req: Request, res: Response) => {
    const keyword = req.query.keyword as string
    try {
        const roles = keyword ? await searchRolesByName(keyword) : await handleGetRole
        return roles
    }
    catch (error) {
        res.status(500).json("Unable to render roles")
    }
}

const handleGetRole = async (_req: Request, res: Response) => {
    try {
        const roles = await getRoles()
        res.status(200).send(roles)
    }
    catch (error) {
        res.status(500).json("Unable to get roles")
    }
}

const handleCreateRole = async (req: Request, res: Response) => {
    const { newRoleName } = req.body;

    if (!newRoleName || newRoleName.trim() === "") {
        return res.status(400).json({
            message: "Role name is required"
        });
    }

    try {
        const role = await createRole(newRoleName.trim());

        return res.status(201).json({
            message: "Successfully created role",
            data: role
        });
    } catch (error) {
        return res.status(500).json({
            message: "Unable to create role"
        });
    }
};

const handleUpdateRole = async (req: Request, res: Response) => {
    const { id, newRoleName } = req.body
    if (!id || !newRoleName) {
        res.status(500).json("Unable to update role")
    }
    try {
        await updateRole(id, newRoleName)
        res.status(200).json("update role successfully")
    }
    catch (error) {
        res.status(500).json("Unable to update role")
    }
}

const handleDeleteRole = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        await deleteRoleById(id)
        res.status(200).json("Successful Deleted Role")
    }
    catch (error) {
        res.status(500).json("Unable to Delete Role")
    }
}

export { handleCreateRole, renderRoleList, handleGetRole, handleUpdateRole, handleDeleteRole }