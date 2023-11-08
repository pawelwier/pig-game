import { parse } from 'url'
import { getGameById } from './game/gameService.js'
import { findGames, getGamePlayers } from './game/gameController.js'
import { findPlayerById } from './player/playerController.js'

const setCorsDataHeaders = res => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET')
  res.setHeader('Access-Control-Max-Age', 2592000)
}

const getUrlNoParams = url => url?.split('?')[0] || ''

export const handleRequests = async (req, res) => {
  setCorsDataHeaders(res)
  switch (getUrlNoParams(req.url)) {
    case '/game':
      const parsed = parse(req.url, true)
      const { query: { gameId } } = parsed
      if (gameId) {
        const game = await getGameById({ gameId })
        res.end(JSON.stringify(game))
      } else await findGames(req, res)
      break
    case '/game-players':
      await getGamePlayers(req, res)
      break
    case '/player':
      await findPlayerById(req, res)
      break
  }
}