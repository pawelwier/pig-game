import express, { json } from 'express'
import { dbConnect, webSocketConnect } from "./connections/connect.js"
import { playerRouter } from './api/player/playerRoutes.js'
import { gameRouter } from './api/game/gameRoutes.js'

const app = express()

dbConnect()
webSocketConnect()

app.use(json())

app.use('/player', playerRouter)
app.use('/game', gameRouter)

app.listen(1212)