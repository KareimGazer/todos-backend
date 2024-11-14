const express = require('express')
require('express-async-errors')
const app = express()

const todosRouter = require('./controllers/todos')

const {
    handleSequelizeErrors,
    handleGenericErrors,
    handleNotFoundErrors,
    requestLogger,
} = require('./middleware')

app.use(express.json())
app.use(requestLogger)
app.use('/todos', todosRouter)

// error handling

app.use(handleSequelizeErrors.databaseErrorHandler)
app.use(handleSequelizeErrors.castErrorHandler)
app.use(handleSequelizeErrors.connectionErrorHandler)
app.use(handleSequelizeErrors.validationErrorHandler)
app.use(handleSequelizeErrors.permissionErrorHandler)
app.use(handleSequelizeErrors.timeoutErrorHandler)

app.use(handleGenericErrors.javaScriptErrorsHandler)
app.use(handleGenericErrors.systemErrorsHandler)
app.use(handleGenericErrors.genericErrorsHandler)

app.use(handleNotFoundErrors.handleUserNotFoundError)
app.use(handleNotFoundErrors.handleTodoNotFoundError)
app.use(handleNotFoundErrors.handleNotFoundError)

module.exports = app
