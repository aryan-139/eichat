const express = require('express');
const router = express.Router();

const rootRouter = (app) => {

    //Root routes

    app.use('/',

        router.get('/', (req, res) => {
            res.status(200).json({
                message: 'Welcome to EI Chat App!'
            });
        }));
    app.use('/signup', require('./register'));
    app.use('/groups', require('./groups'));
    app.use('/user', require('./user'));
    app.use('/messages', require('./messages'));


    //404 handler
    app.use('*', (req, res) => {
        res.status(404).json({
            message: 'Oops! The resource you are looking for is not found :)'
        })
    });

}

module.exports = rootRouter;