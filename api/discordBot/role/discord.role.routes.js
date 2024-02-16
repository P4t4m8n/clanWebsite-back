import express from 'express'
import { log } from '../../../middlewares/logger.middleware.js'
import { addRole, deleteRole, getRoleById, getRoles, updateRole } from './discord.role.controller.js'
import { requireAdmin, requireAuth } from '../../../middlewares/requireAuth.middleware.js'

export const discordRoleRoutes = express.Router()

discordRoleRoutes.get('/', requireAuth, requireAdmin, log, getRoles)
discordRoleRoutes.get('/:roleId', requireAuth, requireAdmin, log, getRoleById)
discordRoleRoutes.post('/edit', requireAuth, requireAdmin, log, addRole)
discordRoleRoutes.put('/edit/:roleId', requireAuth, requireAdmin, log, updateRole)
discordRoleRoutes.delete('/:roleId', requireAuth, requireAdmin, log, deleteRole)


