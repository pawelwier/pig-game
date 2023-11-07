import express, { json } from 'express'
import cors from 'cors'
import { dbConnect, webSocketConnect } from "./connections/connect.js"
import { playerRouter } from './api/player/playerRoutes.js'
import { gameRouter } from './api/game/gameRoutes.js'

const app = express()

const port = process.env.PORT || process.env.API_PORT

dbConnect()
webSocketConnect()

app.use(json())
app.use(cors())

app.use('/player', playerRouter)
app.use('/game', gameRouter)

app.listen(port, () => { console.log(`api listening on port ${port}`) })