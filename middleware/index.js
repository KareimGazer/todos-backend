module.exports = {
    handleSequelizeErrors: require('./error/sequelizeErrors'),
    handleGenericErrors: require('./error/genericErrors'),
    handleNotFoundErrors: require('./error/notFoundError'),
    requestLogger: require('./logging/requestLogger')
};