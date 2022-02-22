import { Router } from 'express'

import { listGamesHistory } from '../controllers/gamesController.js'

const router = Router()

router.get('/', listGamesHistory)

export default router
