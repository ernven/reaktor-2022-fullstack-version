export type player = {
  id: number,
  name: string
}

type playerGameType = {
  name: string,
  played: string
}

export type game = {
  gameId: string,
  t: number,
  playerA: playerGameType,
  playerB: playerGameType
}
