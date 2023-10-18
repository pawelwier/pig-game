import express from 'express'
import { addPlayer, addToCurrentScore, findGameById, setCurrentPlayerId, takePoints } from './gameController.js'

export const gameRouter = express.Router()

gameRouter.use((req, res, next) => {
  // TODO: middleware?
  next()
})

gameRouter.get('/:gameId', findGameById)
gameRouter.post('/add-player/:gameId', addPlayer)
gameRouter.post('/current/:gameId', setCurrentPlayerId)
gameRouter.post('/take/:gameId', takePoints)
gameRouter.post('/add-score/:gameId', addToCurrentScore)