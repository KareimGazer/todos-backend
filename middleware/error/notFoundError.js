const logger = require('../../utils/logger');

const handleUserNotFoundError = (err, req, res, next) => {
    if (err.name === 'User NotFoundError') {
        logger.error(err.message);
        return res.status(404).json({ message: 'User not found' });
    }
    next(err);
};

const handleTodoNotFoundError = (err, req, res, next) => {
    if (err.name === 'TodoNotFoundError') {
        logger.error(err.message);
        return res.status(404).json({ message: 'Todo not found' });
    }
    next(err);
};

const handleNotFoundError = (err, req, res, next) => {
    if (err.name === 'NotFoundError') {
        logger.error(err.message);
        return res.status(404).json({ message: 'Resource not found' });
    }
    next(err);
};

module.exports = {
    handleUserNotFoundError,
    handleTodoNotFoundError,
    handleNotFoundError
}
