const ValidationError = require('./ValidationError');

module.exports = {
    responseNotFound: {
        status: 404,
        message: 'Not found',
    },

    internalError: {
        status: 500,
        message: 'Internal server error',
    },

    getValidationError (error) {
        return new ValidationError(error).json();
    }
}