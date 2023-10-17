import { Schema, model } from 'mongoose'
import { gameConfig } from '../../config.js'

const { ObjectId } = Schema

const GameOptionsSchema = new Schema({
  target: {
    type: Number,
    default: gameConfig.score.default
  },
})

export const GameSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: ObjectId,
  current: {
    type: ObjectId,
    default: null
  },
  options: GameOptionsSchema,
  players: {
    type: [ObjectId],
    default: []
  }
})

export const GameModel = model('Game', GameSchema)