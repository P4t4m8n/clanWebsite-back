import express from 'express'

export const discordBotRoutes = express.Router()

import { discordRoleRoutes } from './role/discord.role.routes.js'
import { discordAuthRoutes } from './auth/discord.auth.routes.js'
discordBotRoutes.use('/role', discordRoleRoutes)
discordBotRoutes.use('/auth', discordAuthRoutes)



