import express from 'express'
import { log } from '../../../middlewares/logger.middleware.js'
import { addRole, deleteRole, getRoleById, getRoles, updateRole } from './discord.role.controller.js'

export const discordRoleRoutes = express.Router()

discordRoleRoutes.get('/', log, getRoles)
discordRoleRoutes.get('/:roleId', log, getRoleById)
discordRoleRoutes.post('/edit', log, addRole)
discordRoleRoutes.put('/edit/:roleId', log, updateRole)
discordRoleRoutes.delete('/:roleId', log, deleteRole)


