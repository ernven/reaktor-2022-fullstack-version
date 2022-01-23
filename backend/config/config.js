export const appConfig = {
  port: process.env.PORT
}

export const dbConfig = {
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  }
}