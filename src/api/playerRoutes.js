import express from 'express'
import { isValidObjectId } from 'mongoose'
import { PlayerModel } from '../db/models/Player.js'

export const playerRouter = express.Router()

playerRouter.use((req, res, next) => {
  // TODO: middleware?
  next()
})

// TODO: move code to functions
playerRouter.get('/:playerId', async (req, res) => {
  const { playerId } = req.params

  if (!isValidObjectId(playerId)) {
    res.send('Invalid player id')
    return
  }

  const player = await PlayerModel.findById(playerId)
  
  res.send(player?.name || 'Player not found')
})

playerRouter.post('/', async (req, res) => {
  const { name } = req.body

  await PlayerModel.create({ name })

  res.send(`Player ${name} created`)
})