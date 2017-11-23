const mongoose = require('mongoose');

/**
 * Drop the collection before each test.
 */
beforeEach(function (done) {
    mongoose.connection.collections.messages.drop(() => {
        done();
    })
})
