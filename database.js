const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

/**
 * Connect to mongodb before test run.
 */
let mongodb = process.env.NODE_ENV === 'testing' 
    ? process.env.MONGODB_TEST 
    : process.env.MONGODB_URI;

mongoose.connect(mongodb, { useMongoClient: true });

mongoose.connection.once('open', () => {
    console.log('Connection has been made.');
}).on('error', error => {
    console.log('Could not set up connection to database.');
});