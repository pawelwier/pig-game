import express, { json } from 'express'
import { dbConnect } from "./db/fn/connect.js"
import { playerRouter } from './api/playerRoutes.js'
import { gameRouter } from './api/gameRoutes.js'

const app = express()

dbConnect()

app.use(json())

app.use('/player', playerRouter)
app.use('/game', gameRouter)

app.listen(1212)