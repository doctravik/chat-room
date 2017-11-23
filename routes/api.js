const Router = require('express').Router();
const MessageController = require('./../controllers/MessageController');


/**
 * Read list of messages
 */
Router.get('/messages/list/:page([1-9][0-9]{0,})', MessageController.index);

/**
 * Read one message
 */
Router.get('/messages/single/:id([0-9a-fA-F]{24})', MessageController.show);

/**
 * Create message
 */
Router.post('/messages', MessageController.create);


module.exports = Router;