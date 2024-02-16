
import express from 'express'
import { log } from '../../../middlewares/logger.middleware.js'
import { requireAuth } from '../../../middlewares/requireAuth.middleware.js'
import { getAuthCallback, redirectToAuth } from './discord.auth.controller.js'

export const discordAuthRoutes = express.Router()

discordAuthRoutes.get('/', log, redirectToAuth)
discordAuthRoutes.get('/callback/',log,getAuthCallback)



