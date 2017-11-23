require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const dbConnection = require('./database.js');
const errorHandler = require('./middlewares/errorHandler');
const { responseNotFound } = require('./app/errors/index');

/**
 * Run express framework.
 */
const app = express();

/**
 * Set port.
 */
app.set('port', (process.env.PORT || 3000));

/**
 * Set up view engine.
 */
app.set('view engine', 'ejs');

/**
 * Use body-parser middleware
 */ 
app.use(bodyParser.json());

/**
 * Web routes
 */ 
app.use(require('./routes/web'));

/**
 * Api routes
 */ 
app.use('/api', require('./routes/api'));

/**
 * Error handling middleware
 */
app.use(errorHandler);

/**
 * Assume 404 since no middleware responded
 */
app.use((req, res, next) => {
    res.status(404).json(responseNotFound);
});

/**
 * Run application.
 */
app.listen(app.get('port'), () => {
    console.log('app now listening for requests on port - ' + app.get('port'));
});

module.exports = app;