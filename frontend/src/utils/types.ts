type player = {
  name: string,
  played: string
}

export type game = {
  gameId: string,
  t: number,
  playerA: player,
  playerB: player
}