import { Router } from 'express'

import { listPlayers } from '../controllers/playersController.js'

const router = Router()

// GET all players.
router.get('/', listPlayers)

export default router
