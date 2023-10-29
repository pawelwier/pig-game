import { gameConfig } from "../../config.js"
import { GameModel, GameState } from "../../db/models/Game.js"
import { getPlayerById } from "../player/playerService.js"
import { getNextPlayerId } from "./gameHelpers.js"

export const getGames = async () => GameModel.find({})

export const getGameById = async ({ gameId }) => GameModel.findById(gameId)

export const insertGame = async ({ playerId }) => {
  return await GameModel.create({ 
    createdBy: playerId,
    players: [playerId]
  })
}

export const startGame = async ({ gameId }) => {
  const { createdBy } = await getGameById({ gameId })
  await GameModel.findByIdAndUpdate(gameId, {
    $set: {
      state: GameState.ACTIVE,
      currentPlayer: createdBy,
    }
  })
}

export const addPlayerToGame = async ({ gameId, playerId }) => {
  await GameModel.findByIdAndUpdate(gameId, {
    $push: {
      players: playerId
    }
  })
}

export const updateCurrentPlayerId = async ({ gameId, playerId }) => {
  await GameModel.findByIdAndUpdate(gameId, {
    $set: {
      currentPlayer: playerId
    }
  })
}

export const updateCurrentScore = async ({ gameId, score, increase = false }) => {
  const operator = increase ? '$inc' : '$set'
  await GameModel.findByIdAndUpdate(gameId, {
    [operator]: {
      currentScore: score
    }
  })
}

export const rollNumber = async ({ gameId, points }) => {
  let increase = true
  let currentPlayer

  const isZero = gameConfig.losingNumbers.includes(Number(points))
  const game = await getGameById({ gameId })

  if (isZero) {
    const opponentId = getNextPlayerId({ game })
    await updateCurrentPlayerId({ gameId, playerId: opponentId })
    increase = false
    points = 0
    currentPlayer = opponentId
  }

  await updateCurrentScore({ gameId, score: points, increase })

  return { points, currentPlayer }
}

export const getGamePlayerData = async ({ gameId }) => {
  const game = await getGameById({ gameId })
  const { players } = game
  return await Promise.all(players.map(async playerId => await getPlayerById({ playerId })))
}