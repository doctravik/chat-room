const mongoose = require('mongoose');
const { isEmail } = require('validator');
const Pagination = require('./../app/pagination/Pagination');
const MessageTransformer = require('./../app/transformers/MessageTransformer');

const messageSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email address is required'],
        validate: {
            validator: isEmail,
            message: '{VALUE} is not a valid email address',
            isAsync: false
        }
    },

    body: {
        type: String,
        required: [true, 'Message is required'],
        maxlength: 100
    },

    created: {
        type: Date, 
        default: Date.now
    },

    updated: {
        type: Date, 
        default: Date.now
    }
});

/**
 * Message transformation handler.
 * 
 * @param  {Object} message
 * @return {Object}
 */
messageSchema.statics.transform = function (message) {
    if (message instanceof Pagination) {
        return new MessageTransformer().transformCollection(message)
    }

    return new MessageTransformer().transformItem(message);
}

/**
 * Pagination query scope.
 * 
 * @param  {Number} page
 * @param  {Number} perPage
 * @param  {Request} req
 * @return {Promise}
 */
messageSchema.query.paginate = function (page, perPage, req) {
    let skip = Number(page - 1) * perPage;

    return this.skip(skip).limit(perPage).then(items => {
        return this.countItems().then(count => {
            return Promise.resolve(
                new Pagination(items, page, perPage, count, req)
            );
        });
    });
};

/**
 * Count query scope.
 * 
 * @return {Promise}
 */
messageSchema.query.countItems = function () {
    return this.model.find(this.getQuery()).count();
};


const Message = mongoose.model('Message', messageSchema);


module.exports = Message;