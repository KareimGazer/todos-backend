require('dotenv').config();

const PORT = process.env.PORT || 3000
const DB_URL = process.env.DB_URL || 'localhost:5432'
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'admin'
const POSTGRES_USER = process.env.POSTGRES_USER || 'admin'
const POSTGRES_DB = process.env.POSTGRES_DB || 'todos'
const DATABASE_URL = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_URL}/${POSTGRES_DB}`

module.exports = {
    PORT,
    DATABASE_URL
}
