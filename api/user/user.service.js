

import mongodb from 'mongodb'
const { ObjectId } = mongodb
import { dbService } from '../../service/db.service.js'
import { loggerService } from '../../service/logger.service.js'

export const userService = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add
}

async function query(filterBy = {}) {

    const criteria = _buildCriteria(filterBy)

    try {
        const collection = await dbService.getCollection('user')

        var users = await collection.find(criteria).sort({ nickname: -1 }).toArray()

        users = users.map(user => {

            delete user.password
            user.createdAt = new ObjectId(user._id).getTimestamp()

            return user
        })
        return users
    }
    catch (err) {
        loggerService.error('cannot find users', err)
        throw err
    }
}

async function getById(userId) {
    try {

        const collection = await dbS.getCollection('user')
        const user = await collection.findOne({ _id: ObjectId(userId) })

        delete user.password
        return user

    }
    catch (err) {

        loggerService.error(`while finding user ${userId}`, err)
        throw err
    }
}
async function getByUsername(username) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ username })

        return user
    }
    catch (err) {
        loggerService.error(`while finding user ${username}`, err)
        throw err
    }
}

async function remove(userId) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.deleteOne({ _id: ObjectId(userId) })

    } catch (err) {
        loggerService.error(`cannot remove user ${userId}`, err)
        throw err
    }
}

async function update(user) {
    try {
        const userToSave = { ...user, _id: new ObjectId(user._id) }

        const collection = await dbService.getCollection('user')
        await collection.updateOne({ _id: userToSave._id }, { $set: userToSave })
        return userToSave
    } catch (err) {
        loggerService.error(`cannot update user ${user._id}`, err)
        throw err
    }
}

async function add(user) {
    try {
        const existUser = await getByUsername(user.username)
        if (existUser) throw new Error('Username taken')

        const userToAdd = { ...user }
        const collection = await dbService.getCollection('user')
        await collection.insertOne(userToAdd)

        return userToAdd
    } catch (err) {
        loggerService.error('cannot insert user', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                username: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }

    return criteria
}