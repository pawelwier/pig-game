import express from 'express'
import { createPlayer, getPlayerById } from './playerController.js'

export const playerRouter = express.Router()

playerRouter.use((req, res, next) => {
  // TODO: middleware?
  next()
})

playerRouter.get('/:playerId', getPlayerById)
playerRouter.post('/', createPlayer)