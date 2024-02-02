import express from 'express'

import { deleteUser, updateUser } from './user.controller.js'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { log } from '../../middlewares/logger.middleware.js'

export const userRoutes = express.Router()
userRoutes.put('/:userId',log , updateUser)
// userRoutes.delete('/:userId', requireAuth, deleteUser)
