import { loggerService } from '../../service/logger.service.js'
import { unitService } from './unit.service.js'

export async function getUnits(req, res) {
    const { level } = req.query
    try {
        const filterSortBy = {level}
        loggerService.debug('Getting units', filterSortBy)
        const units = await unitService.query(filterSortBy)
        res.json(units)
    }
    catch (err) {
        loggerService.error('Failed to get units', err)
        res.status(500).send({ err: 'Failed to get units' })
    }
}

export async function getUnitById(req, res) {

    try {
        const { unitId } = req.params
        const unit = await unitService.getById(unitId)
        res.json(unit)

    }
    catch (err) {
        loggerService.error('Failed to get unit', err)
        res.status(500).send({ err: 'Failed to get unit' })
    }
}

export async function addUnit(req, res) {

    const {
        name,
        imgUrl,
        subUnits,
        members,
        style,
        description,
        type,
        level,
        parent
    } = req.body

    try {

        const unitToSave = {
            name,
            imgUrl,
            subUnits,
            members,
            style,
            description,
            type,
            level,
            parent
        }

        const addedunit = await unitService.add(unitToSave)
        res.json(addedunit)

    }
    catch (err) {
        loggerService.error('Failed to add unit', err)
        res.status(500).send({ err: 'Failed to add unit' })
    }
}

export async function updateUnit(req, res) {

    const {
        name,
        imgUrl,
        subUnits,
        members,
        style,
        description,
        type,
        _id,
        level,
        parent
    } = req.body

    try {
        const unitToSave = {
            name,
            imgUrl,
            subUnits,
            members,
            style,
            description,
            type,
            level,
            parent
        }
        const unitId = _id
        const updatedunit = await unitService.update(unitToSave, unitId)
        res.json(updatedunit)
    }
    catch (err) {
        loggerService.error('Failed to update unit', err)
        res.status(500).send({ err: 'Failed to update unit' })
    }
}

export async function removeUnit(req, res) {
    try {
        const { unitId } = req.params
        await unitService.remove(unitId)
        res.send()

    }
    catch (err) {
        loggerService.error('Failed to remove unit', err)
        res.status(500).send({ err: 'Failed to remove unit' })
    }
}




