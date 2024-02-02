import { ObjectId } from "mongodb"
import { dbService } from "../../service/db.service.js"
import { loggerService } from "../../service/logger.service.js"

const DB_NAME = 'event'

export const eventService = {
    query,
    getById,
    remove,
    add,
    update,
}

async function query(filterSortBy = {}) {
    try {
        const criteria = _buildCriteria(filterSortBy)
        const collection = await dbService.getCollection(DB_NAME)
        var events = await collection.find(criteria).toArray()
        return events
    }
    catch (err) {
        log.error('cannot find event', err)
        throw err
    }
}

async function getById(eventId) {
    try {
        const collection = await dbService.getCollection(DB_NAME)
        const event = await collection.findOne({ _id: new ObjectId(eventId) })
        if (!event) {
            throw new Error(`event not found with id: ${eventId}`)
        }
        return event

    }
    catch (err) {
        loggerService.error(`while finding event ${eventId}`, err)
        throw err
    }
}

async function remove(eventId) {
    try {
        const collection = await dbService.getCollection(DB_NAME)
        await collection.deleteOne({ _id: new ObjectId(eventId) })
    }
    catch (err) {
        loggerService.error(`cannot remove event ${eventId}`, err)
        throw err
    }
}

async function add(event) {
    try {
        const collection = await dbService.getCollection(DB_NAME)
        await collection.insertOne(event)

        return event

    }
    catch (err) {
        loggerService.error('cannot add event', err)
        throw err
    }
}

async function update(event, eventId) {
    try {
        const collection = await dbService.getCollection(DB_NAME)
        await collection.updateOne({ _id: new ObjectId(eventId) }, { $set: event })

        event._id = eventId
        return event
    }
    catch (err) {
        loggerService.error(`cannot update event ${event._id}`, err)
        throw err
    }
}

function _saveEventsToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('data/event.json', JSON.stringify(gevents, null, 2), (err) => {
            if (err) {
                reject('Cannot write to file')
            } else {
                resolve()
            }
        })
    })
}

function _buildCriteria(filterSortBy) {
    const criteria = {}
    return criteria
}
