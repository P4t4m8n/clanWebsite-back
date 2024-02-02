
import express from 'express'
import { log } from '../../middlewares/logger.middleware.js'
import { addEvent, getEventById, getEvents, removeEvent, updateEvent } from './event.controller.js'

export const eventRoutes = express.Router()

eventRoutes.get('/', log, getEvents)
eventRoutes.get('/:unitId', log, getEventById)
eventRoutes.post('/edit', log, addEvent)
eventRoutes.put('/edit/:unitId', log, updateEvent)
eventRoutes.delete('/:unitId', log, removeEvent)


