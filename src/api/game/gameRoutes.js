import express from 'express'
import { 
  addPlayer, addToCurrentScore, createGame, findGameById, getGamePlayers, setCurrentPlayerId, start, takePoints
} from './gameController.js'

export const gameRouter = express.Router()

gameRouter.use((req, res, next) => {
  // TODO: middleware?
  next()
})

gameRouter.get('/:gameId', findGameById)
gameRouter.get('/players/:gameId', getGamePlayers)
gameRouter.post('/', createGame)
gameRouter.post('/start/:gameId', start)
gameRouter.post('/add-player/:gameId', addPlayer)
gameRouter.post('/current/:gameId', setCurrentPlayerId) // TODO: delete?
gameRouter.post('/add-score/:gameId', addToCurrentScore)
gameRouter.post('/take/:gameId', takePoints)