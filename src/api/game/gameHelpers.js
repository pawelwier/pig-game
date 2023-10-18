export const getNextPlayerId = ({ game }) => {
  const { players, currentPlayer } = game
  const currentIndex = players.indexOf(currentPlayer)
  return players[currentIndex + 1] || players[0]
}