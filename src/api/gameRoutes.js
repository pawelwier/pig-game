import express from 'express'
import { isValidObjectId } from 'mongoose'
import { GameModel } from '../db/models/Game.js'
import { gameConfig } from '../config.js'
import { PlayerModel } from '../db/models/Player.js'
import { getNextPlayerId } from './gameHelpers.js'

export const gameRouter = express.Router()

gameRouter.use((req, res, next) => {
  // TODO: middleware?
  next()
})

// TODO: move code to functions
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

gameRouter.post('/current/:gameId', async (req, res) => {
  const { params: { gameId }, body: { playerId } } = req

  if (!isValidObjectId(gameId) || !isValidObjectId(playerId)) {
    res.send('Invalid request')
    return
  }

  const game = await GameModel.findById(gameId)

  if (!game?.players?.includes(playerId)) {
    res.send('Player does not take part in the game')
    return
  }

  await GameModel.findByIdAndUpdate(gameId, {
    $set: {
      currentPlayer: playerId
    }
  })

  res.send('Player set as current')
})

gameRouter.post('/take/:gameId', async (req, res) => {
  const { params: { gameId }} = req

  if (!isValidObjectId(gameId)) {
    res.send('Invalid request')
    return
  }

  const game = await GameModel.findById(gameId)
  const { _id, currentPlayer, currentScore } = game
  const player = await PlayerModel.findById(currentPlayer)

  // TODO: move to player functions
  await PlayerModel.findByIdAndUpdate(player._id, {
    $inc: {
      score: currentScore
    }
  })

  const opponentId = await getNextPlayerId({ game, currentPlayer })


  await GameModel.findByIdAndUpdate(_id, {
    $set: {
      currentPlayer: opponentId,
      currentScore: 0
    }
  })

  res.send('Player\'s score added')

  // TODO: if > targetScore, set winner
})