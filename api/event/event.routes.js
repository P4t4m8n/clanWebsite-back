
import express from 'express'
import { log } from '../../middlewares/logger.middleware.js'
import { addEvent, getEventById, getEvents, removeEvent, updateEvent } from './event.controller.js'

export const eventRoutes = express.Router()

eventRoutes.get('/', log, getEvents)
eventRoutes.get('/:eventId', log, getEventById)
eventRoutes.post('/edit', log, addEvent)
eventRoutes.put('/edit/:eventId', log, updateEvent)
eventRoutes.delete('/:eventId', log, removeEvent)


