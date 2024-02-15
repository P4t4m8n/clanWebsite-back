import { createPermissionsBitfield } from "../../../service/discord.service.js";
import { loggerService } from "../../../service/logger.service.js";
import {  discordRoleService } from "./discord.role.service.js";

export async function getRoles(req, res) {
    try {
        loggerService.debug('Getting Roles:', req.query)
        const roles = discordRoleService.query()
        res.status(200).json(roles)
    } catch (err) {
        loggerService.error('Failed to get roles', err)
        res.status(500).send({ err: 'Failed to get roles' })
    }
}

export async function getRoleById(req, res) {

    try {
        const { roleId } = req.params
        const role = discordRoleService.get(roleId)
        res.status(200).json(role)
    }
    catch (err) {
        loggerService.error('Failed to get unit', err)
        res.status(500).send({ err: 'Failed to get unit' })
    }
}

export async function deleteRole(req, res) {
    try {
        const roleId = req.params.roleId
        const removedId = await discordRoleService.remove(roleId)
        res.status(200).send(removedId);
    } catch (err) {
        loggerService.error(`Failed to delete role: ${roleId}`, err)
        res.status(500).send({ err: `Failed to delete role: ${roleId}` })
    }
}

export async function addRole(req, res) {
    const { name, permissions } = req.body
    const bitMapPermissions = createPermissionsBitfield(permissions).toString()

    try {
        const roleToSave = { name, bitMapPermissions }
        const addedRole = await discordRoleService.add(roleToSave)
        res.status(201).json(addedRole)
    } catch (err) {
        loggerService.error('Failed to add role', err)
        res.status(500).send({ err: 'Failed to add role' })
    }
}

export async function updateRole(req, res) {
    try {
        const { name, permissions } = req.body
        const roleId = req.params.roleId
        const updatedRole = await discordRoleService.update({ name, permissions, roleId })
        res.status(200).json(updatedRole)

    } catch (err) {
        loggerService.error(`Failed to update role: ${roleName}`, err)
        res.status(500).send({ err: 'Failed to update role' })

    }
}
