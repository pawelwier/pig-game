import http from 'http'
import { connect } from 'mongoose'
import WS from 'websocket'
import * as dotenv from "dotenv"

dotenv.config()
const WebSocketServer = WS.server

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

    connection.on('message', message => {
      console.log('Received Message: ' + message.utf8Data)
      connection.sendUTF(message.utf8Data)
    });
    connection.on('close', (reasonCode, description) => {
      console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.')
    })
  })
  
  webSocketServer.listen(2323, () => {
    console.log(new Date() + ' Server is listening on port 2323')
  })
}