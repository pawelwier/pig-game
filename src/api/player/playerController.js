import { isValidObjectId } from 'mongoose'
import { getPlayerById, insertPlayer } from './playerService.js'

export const findPlayerById = async (req, res) => {
  const { playerId } = req.params

  if (!isValidObjectId(playerId)) {
    res.send('Invalid player id')
    return
  }

  res.send(getPlayerById(playerId))
}

export const createPlayer = async (req, res) => {
  const { name } = req.body

  await insertPlayer({ name })

  res.send(`Player ${name} created`)
}