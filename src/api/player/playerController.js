import url from 'url'
import { isValidObjectId } from 'mongoose'
import { getPlayerById, insertPlayer } from './playerService.js'

export const findPlayerById = async (req, res) => {
  const parsed = url.parse(req.url, true);
  const { query: { playerId } } = parsed

  if (!isValidObjectId(playerId)) {
    res.end('Invalid player id')
    return
  }

  const player = await getPlayerById({ playerId })

  res.end(JSON.stringify(player))
}

export const createPlayer = async (req, res) => {
  const { name } = req.body

  await insertPlayer({ name })

  res.send(`Player ${name} created`)
}