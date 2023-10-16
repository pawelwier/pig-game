import { Schema, model } from 'mongoose'

export const PlayerSchema = new Schema({
  name: String,
  score: {
    type: Number,
    default: 0
  },
  scoreTotal: {
    type: Number,
    default: 0
  },
  isLoggedIn: {
    type: Boolean,
    default: false
  }
})

export const PlayerModel = model('Player', PlayerSchema)