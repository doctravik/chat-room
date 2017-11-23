const { getValidationError, internalError } = require('./../app/errors/index');

const errorHandler = (error, req, res, next) => {
    if (error.name === 'ValidationError') {
        return res.status(422).json(getValidationError(error))
    }
    return res.status(500).json(internalError);
}

module.exports = errorHandler;