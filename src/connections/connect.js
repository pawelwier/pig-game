import http from 'http'
import { connect } from 'mongoose'
import WS from 'websocket'
import * as dotenv from "dotenv"
import { getPlayerById, updatePlayerScore } from '../api/player/playerService.js'
import { getGameById, rollNumber, updateCurrentPlayerId, updateCurrentScore } from '../api/game/gameService.js'
import { getNextPlayerId } from '../api/game/gameHelpers.js'

dotenv.config()
const WebSocketServer = WS.server

export const MessageTypes = {
  ADD: 'add',
  TAKE: 'take'
}

/* mongo */
export const dbConnect = () => {
  const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@test.fdk5v31.mongodb.net/${process.env.MONGO_DB_NAME}`
  connect(uri)
}

/* websocket */
const webSocketServer = http.createServer((req, res) => {
  console.log(`${new Date()} Received request for ${req.url}`)
  res.writeHead(404)
  res.end()
})

const originIsAllowed = origin => {
  // TODO: add conditions
  return true;
}

export const webSocketConnect = () => {
  const wsServer = new WebSocketServer({
    httpServer: webSocketServer,
    autoAcceptConnections: false
  })
  
  wsServer.on('request', req => {
    if (!originIsAllowed(req.origin)) {
      req.reject()
      console.log((new Date()) + ' Connection from origin ' + req.origin + ' rejected.')
      return
    }
    
    const connection = req.accept('echo-protocol', req.origin)
    console.log((new Date()) + ' Connection accepted.')

    connection.on('message', async message => {
      const data = JSON.parse(message.utf8Data)
      const { type, gameId } = data
      const game = await getGameById({ gameId })

      // TODO: move out, refactor
      if (type === MessageTypes.ADD) { 
        const { score } = data
        const rollResponse = await rollNumber({ gameId, score })

        connection.sendUTF(JSON.stringify({ ...rollResponse, type }))
        return
      }
      else if (type === MessageTypes.TAKE) {
        const { currentPlayer, currentScore } = game
        const player = await getPlayerById({ playerId: currentPlayer })
        const opponentId = getNextPlayerId({ game })
      
        await updatePlayerScore({ playerId: player._id,  score: currentScore })
        await updateCurrentPlayerId({ gameId, playerId: opponentId })
        await updateCurrentScore({ gameId, score: 0 })

        connection.sendUTF(JSON.stringify({ currentPlayer: opponentId, type }))
      }
    })

    connection.on('close', (reasonCode, description) => {
      console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.')
    })
  })
  
  webSocketServer.listen(2323, () => {
    console.log(new Date() + ' Server is listening on port 2323')
  })
}