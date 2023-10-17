import express from 'express'
import { isValidObjectId } from 'mongoose'
import { GameModel } from '../db/models/Game.js'
import { gameConfig } from '../config.js'

export const gameRouter = express.Router()

gameRouter.use((req, res, next) => {
  // TODO: middleware?
  next()
})

gameRouter.get('/:gameId', async (req, res) => {
  const { gameId } = req.params

  if (!isValidObjectId(gameId)) {
    res.send('Invalid game id')
    return
  }

  const game = await GameModel.findById(gameId)
  
  res.json(game)
})

gameRouter.post('/add-player/:gameId', async (req, res) => {
  const { params: { gameId }, body: { playerId } } = req

  if (!isValidObjectId(gameId) || !isValidObjectId(playerId)) {
    res.send('Invalid request')
    return
  }

  const game = await GameModel.findById(gameId)

  if (game?.players?.length >= gameConfig.maxPlayers) {
    res.send('Cannot add more players')
    return
  }

  await GameModel.findByIdAndUpdate(gameId, {
    $push: {
      players: playerId
    }
  })

  res.send('Player added')
})