class ValidationError
{
    /**
     * Create new instance of ValidationError.
     * 
     * @param {Object} error
     */
    constructor (error) {
        this.error = error;
        this.validationErrors = error.errors;
    }

    /**
     * Transform error to json.
     * 
     * @return {Object} 
     */
    json () {
        return {
            status: 422,
            message: 'Unproccesable entity',
            errors: this.transform()
        }
    }

    /**
     * Pluck messages from ValidationError.
     * 
     * @param  {Object} messages
     * @return {Object}
     */
    transform (messages = {}) {
        for (let error in this.validationErrors) {
           messages[error] = this.validationErrors[error]['message'];
        }

        return messages;
    }
}

module.exports = ValidationError;