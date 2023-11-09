import { PlayerModel } from "../../db/models/Player.js"

export const insertPlayer = async ({ name }) => {
  return await PlayerModel.create({ name })
}

export const getPlayerById = async ({ playerId }) => await PlayerModel.findById(playerId)

export const updatePlayerScore = async ({ playerId, score, increase = false }) => {
  const operator = increase ? '$inc' : '$set'
  await PlayerModel.findByIdAndUpdate(playerId, {
    [operator]: {
      score
    }
  })
}