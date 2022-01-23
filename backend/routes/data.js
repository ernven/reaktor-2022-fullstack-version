import { Router } from 'express'

import { listData } from '../controllers/dataController.js'

const router = Router()

// GET all games data.
router.get('/', listData)

export default router
