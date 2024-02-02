
import express from 'express'

import { log } from '../../middlewares/logger.middleware.js'
import { addUnit, getUnitById, getUnits, removeUnit, updateUnit } from './unit.controller.js'

export const unitRoutes = express.Router()

unitRoutes.get('/', log, getUnits)
unitRoutes.get('/:unitId', log, getUnitById)
unitRoutes.post('/edit', log, addUnit)
unitRoutes.put('/edit/:unitId', log, updateUnit)
unitRoutes.delete('/:unitId', log, removeUnit)


