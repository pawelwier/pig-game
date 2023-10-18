import { Schema, model } from 'mongoose'
import { gameConfig } from '../../config.js'

const { ObjectId } = Schema

export const GameState = {
  NEW: 'new',
  ACTIVE: 'active',
  FINISHED: 'finished'
}

const GameOptionsSchema = new Schema({
  target: {
    type: Number,
    default: gameConfig.score.default
  }
})

export const GameSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: ObjectId,
  state: {
    type: String,
    enum: Object.values(GameState),
    default: GameState.NEW
  },
  currentPlayer: {
    type: ObjectId,
    default: null
  },
  currentScore: {
    type: Number,
    default: 0
  },
  options: GameOptionsSchema,
  players: {
    type: [ObjectId],
    default: []
  }
})

export const GameModel = model('Game', GameSchema)