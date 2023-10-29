import express, { json } from 'express'
import cors from 'cors'
import { dbConnect, webSocketConnect } from "./connections/connect.js"
import { playerRouter } from './api/player/playerRoutes.js'
import { gameRouter } from './api/game/gameRoutes.js'

const app = express()

const port = process.env.PORT || 1212

dbConnect()
webSocketConnect()

app.use(json())
app.use(cors())

app.use('/player', playerRouter)
app.use('/game', gameRouter)

app.listen(port, () => `listening on port ${port}`)