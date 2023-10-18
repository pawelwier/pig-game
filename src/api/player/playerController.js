import { isValidObjectId } from 'mongoose'
import { insertPlayer } from './playerService.js'

export const getPlayerById = async (req, res) => {
  const { playerId } = req.params

  if (!isValidObjectId(playerId)) {
    res.send('Invalid player id')
    return
  }

  const player = await getPlayerById(playerId)
  
  res.send(player?.name || 'Player not found')
}

export const createPlayer = async (req, res) => {
  const { name } = req.body

  await insertPlayer({ name })

  res.send(`Player ${name} created`)
}