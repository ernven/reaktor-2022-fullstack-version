type playerBadAPI = {
  name: string,
  played: string
}

export type gameBadAPI = {
  gameId: string,
  t: number,
  playerA: playerBadAPI,
  playerB: playerBadAPI
}

export type gameDB = {
  id: string,
  date: Date,
  first_name: string,
  first_played: string,
  second_name: string,
  second_played: string,
}

export type player = {
  name: string
}