import { loggerService } from '../../service/logger.service.js'
import { eventService } from './event.service.js'

export async function getEvents(req, res) {
    try {
        const filterSortBy = {}
        loggerService.debug('Getting events', filterSortBy)
        const events = await eventService.query(filterSortBy)
        res.json(events)
    }
    catch (err) {
        loggerService.error('Failed to get events', err)
        res.status(500).send({ err: 'Failed to get events' })
    }
}

export async function getEventById(req, res) {
    try {
        const { eventId } = req.params
        const event = await eventService.getById(eventId)
        res.json(event)

    }
    catch (err) {
        loggerService.error('Failed to get event', err)
        res.status(500).send({ err: 'Failed to get event' })
    }
}

export async function addEvent(req, res) {

    const {
        unit,
        name,
        description,
        start,
        end,
        inviteList,
        createBy,
        isMandtory
    } = req.body

    try {

        const eventToSave = {
            unit,
            name,
            description,
            start,
            end,
            inviteList,
            createBy,
            isMandtory
        }

        const addedevent = await eventService.add(eventToSave)
        res.json(addedevent)

    }
    catch (err) {
        loggerService.error('Failed to add event', err)
        res.status(500).send({ err: 'Failed to add event' })
    }
}

export async function updateEvent(req, res) {

    const {
        unit,
        name,
        description,
        start,
        end,
        inviteList,
        createBy,
        isMandtory,
        _id
    } = req.body

    try {
        const eventToSave = {
            unit,
            name,
            description,
            start,
            end,
            inviteList,
            createBy,
            isMandtory
        
        }
        const eventId = _id
        const updatedEvent = await eventService.update(eventToSave, eventId)
        res.json(updatedEvent)
    }
    catch (err) {
        loggerService.error('Failed to update event', err)
        res.status(500).send({ err: 'Failed to update event' })
    }
}

export async function removeEvent(req, res) {
    try {
        const { eventId } = req.params
        await eventService.remove(eventId)
        res.send()
    }
    catch (err) {
        loggerService.error('Failed to remove event', err)
        res.status(500).send({ err: 'Failed to remove event' })
    }
}




