export type player = {
  id: number,
  name: string
}

type playerGameType = {
  name: string,
  played: string
}

export type gameRealTime = {
  gameId: string,
  t: number,
  playerA: playerGameType,
  playerB: playerGameType
}

export type gameHistorical = {
  id: string,
  date: string,
  first_name: string,
  first_played: string,
  second_name: string,
  second_played: string
}
