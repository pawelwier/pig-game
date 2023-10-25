import express from 'express'
import { createPlayer, findPlayerById } from './playerController.js'

export const playerRouter = express.Router()

playerRouter.use((req, res, next) => {
  // TODO: middleware?
  next()
})

playerRouter.get('/:playerId', findPlayerById)
playerRouter.post('/', createPlayer)