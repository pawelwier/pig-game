import { PlayerModel } from "../../db/models/Player.js"

export const insertPlayer = async ({ name }) => {
  return await PlayerModel.create({ name })
}

export const getPlayerById = async ({ playerId }) => await PlayerModel.findById(playerId)

export const updatePlayerScore = async ({ playerId, score }) => {
  await PlayerModel.findByIdAndUpdate(playerId, {
    $inc: {
      score
    }
  })
}