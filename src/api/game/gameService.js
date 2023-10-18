import { GameModel } from "../../db/models/Game.js";

export const getGameById = async ({ gameId }) => GameModel.findById(gameId)

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