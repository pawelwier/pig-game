import { Schema, model } from 'mongoose'
import { PlayerSchema } from './Player.js'

const { ObjectId } = Schema

const GameOptionsSchema = new Schema({
  target: {
    type: Number,
    default: 50
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
    type: [PlayerSchema],
    default: []
  }
})

export const GameModel = model('Game', GameSchema)