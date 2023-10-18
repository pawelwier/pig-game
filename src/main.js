import express, { json } from 'express'
import { dbConnect } from "./db/fn/connect.js"
import { playerRouter } from './api/player/playerRoutes.js'
import { gameRouter } from './api/game/gameRoutes.js'
import { updateCurrentScore } from './api/game/gameService.js'

const app = express()

dbConnect()

app.use(json())

app.use('/player', playerRouter)
app.use('/game', gameRouter)

app.listen(1212)