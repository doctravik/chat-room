const Router = require('express').Router();

/**
 * Show main page
 */
Router.get('/', (req, res) => {
    res.render('index'); 
});

module.exports = Router;