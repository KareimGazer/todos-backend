const { DATABASE_URL } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(DATABASE_URL, { dialect: 'postgres' })
const logger = require('./logger')

// The runMigrations function that performs migrations is now executed every time the application
// opens a database connection when it starts.
// Sequelize keeps track of which migrations have already been completed,
// so if there are no new migrations, running the runMigrations function does nothing.
const migrationConf = {
    migrations: {
        glob: 'migrations/*.js',
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    logger: console,
}

const runMigrations = async () => {
    const migrator = new Umzug(migrationConf)
    const migrations = await migrator.up()
    console.log('Migrations up to date', {
        files: migrations.map((mig) => mig.name),
    })
}

const rollbackMigration = async () => {
    await sequelize.authenticate()
    const migrator = new Umzug(migrationConf)
    await migrator.down()
}

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate()
        await runMigrations()
        logger.info('connected to the database')
    } catch (exception) {
        logger.info('failed to connect to the database')
        logger.error(exception)
        return process.exit(1)
    }
    return null
}

module.exports = { connectToDatabase, sequelize, rollbackMigration }
