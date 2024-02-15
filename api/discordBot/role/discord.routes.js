import express from 'express'

export const discordBotRoutes = express.Router()

import { discordRoleRoutes } from './discord.role.routes.js'
discordBotRoutes.use('/role', discordRoleRoutes)



