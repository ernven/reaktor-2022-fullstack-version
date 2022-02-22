import { Router } from 'express'

import { listData } from '../controllers/dataController.js'

const router = Router()

router.get('/', listData)

export default router
