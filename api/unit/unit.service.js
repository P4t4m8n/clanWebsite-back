import { ObjectId } from "mongodb"
import { dbService } from "../../service/db.service.js"
import { loggerService } from "../../service/logger.service.js"

const DB_NAME = 'unit'

export const unitService = {
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
        var units = await collection.find(criteria).toArray()
        return units
    }
    catch (err) {
        log.error('cannot find unit', err)
        throw err
    }
}

async function getById(unitId) {
    try {
        const collection = await dbService.getCollection(DB_NAME)
        const unit = await collection.findOne({ _id: new ObjectId(unitId) })
        if (!unit) {
            throw new Error(`Unit not found with id: ${unitId}`)
        }
        return unit

    }
    catch (err) {
        loggerService.error(`while finding unit ${unitId}`, err)
        throw err
    }
}

async function remove(unitId) {
    try {
        const collection = await dbService.getCollection(DB_NAME)
        await collection.deleteOne({ _id: new ObjectId(unitId) })
    }
    catch (err) {
        loggerService.error(`cannot remove unit ${unitId}`, err)
        throw err
    }
}

async function add(unit) {
    try {
        const collection = await dbService.getCollection(DB_NAME)
        await collection.insertOne(unit)

        return unit

    }
    catch (err) {
        loggerService.error('cannot add unit', err)
        throw err
    }
}

async function update(unit, unitId) {
    try {
        const collection = await dbService.getCollection(DB_NAME)
        await collection.updateOne({ _id: new ObjectId(unitId) }, { $set: unit })

        unit._id = unitId
        return unit
    }
    catch (err) {
        loggerService.error(`cannot update unit ${unit._id}`, err)
        throw err
    }
}

function _saveUnitsToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('data/unit.json', JSON.stringify(gunits, null, 2), (err) => {
            if (err) {
                reject('Cannot write to file')
            } else {
                resolve()
            }
        })
    })
}

function _buildCriteria(filterSortBy) {
    const { level } = filterSortBy
    const criteria = {}

    if (level) criteria.level = { $regex: level, $options: 'i' }
    return criteria
}
