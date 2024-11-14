const { PORT, DATABASE_URL } = require('./utils/config')
const app = require('./app')
const { connectToDatabase } = require('./utils/db')

console.log('PostgreSQL DB: Connecting to', DATABASE_URL)
const start = async () => {
    await connectToDatabase()
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

start()
