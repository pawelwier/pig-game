import url from 'url'
import { isValidObjectId } from "mongoose"
import { addPlayerToGame, getGameById, getGamePlayerData, getGames, insertGame, startGame, 
  updateCurrentPlayerId, updateCurrentScore } from "./gameService.js"
import { getNextPlayerId } from "./gameHelpers.js"
import { getPlayerById, updatePlayerScore } from "../player/playerService.js"
import { gameConfig } from "../../config.js"

export const findGames = async (req, res) => {
  const games = await getGames()
  
  res.end(JSON.stringify(games))
}

export const findGameById = async (req, res) => {
  const parsed = url.parse(req.url, true)
  const { query: { gameId } } = parsed

  if (!isValidObjectId(gameId)) {
    res.send('Invalid game id')
    return
  }

  const game = await getGameById({ gameId })
  
  res.end(JSON.stringify(game))
}

export const createGame = async (req, res) => {
  const { playerId } = req.body

  if (!isValidObjectId(playerId)) {
    res.send('Invalid request')
    return
  }

  await insertGame({ playerId })

  res.send('Game created')
}

export const start = async (req, res) => {
  const { gameId } = req.params

  if (!isValidObjectId(gameId)) {
    res.send('Invalid request')
    return
  }

  await startGame({ gameId })

  res.send('Game started')
}

export const addPlayer = async (req, res) => {
  const { params: { gameId }, body: { playerId } } = req

  if (!isValidObjectId(gameId) || !isValidObjectId(playerId)) {
    res.send('Invalid request')
    return
  }

  const game = await getGameById({ gameId })

  if (game?.players?.length >= gameConfig.maxPlayers) {
    res.send('Cannot add more players')
    return
  }

  await addPlayerToGame({ gameId, playerId })

  res.send('Player added')
}

export const setCurrentPlayerId = async (req, res) => {
  const { params: { gameId }, body: { playerId } } = req

  if (!isValidObjectId(gameId) || !isValidObjectId(playerId)) {
    res.send('Invalid request')
    return
  }

  const game = await getGameById({ gameId })

  if (!game?.players?.includes(playerId)) {
    res.send('Player does not take part in the game')
    return
  }

  await updateCurrentPlayerId({ gameId, playerId })

  res.send('Player set as current')
}

export const takePoints = async (req, res) => {
  const { params: { gameId }} = req

  if (!isValidObjectId(gameId)) {
    res.send('Invalid request')
    return
  }

  const game = await getGameById({ gameId })
  const { currentPlayer, currentScore } = game
  const player = await getPlayerById({ playerId: currentPlayer })
  const opponentId = getNextPlayerId({ game })

  await updatePlayerScore({ playerId: player._id,  score: currentScore })
  await updateCurrentPlayerId({ gameId, playerId: opponentId })
  await updateCurrentScore({ gameId, score: 0 })

  res.send('Player\'s score added')

  // TODO: if > targetScore, set winner
}

export const addToCurrentScore = async (req, res) => {
  const { params: { gameId }, body: { score }} = req

  if (!isValidObjectId(gameId) || isNaN(score)) {
    res.send('Invalid request')
    return
  }

  await updateCurrentScore({ gameId, score, increase: true })

  res.send('Score updated')
}

export const getGamePlayers = async (req, res) => {
  const parsed = url.parse(req.url, true);
  const { query: { gameId } } = parsed

  if (!isValidObjectId(gameId)) {
    res.end('Invalid request')
    return
  }

  const players = await getGamePlayerData({ gameId })

  res.end(JSON.stringify(players))
}