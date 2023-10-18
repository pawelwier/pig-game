export const getNextPlayerId = ({ game, currentPlayer }) => {
  const { players } = game
  const currentIndex = players.indexOf(currentPlayer)
  return players[currentIndex + 1] || players[0]
}