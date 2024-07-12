const express = require('express');
const router = express.Router();

const rootRouter = (app) => {

    //Root routes

    app.use('/',

        router.get('/', (req, res) => {
            res.status(200).json({
                message: 'Welcome to EI Chat App!'
            });
        })

    ); 

    //other routes 
      //Unprotected Routes
    //   app.use('/signup', require('./register'));
    //   app.use('/auth', require('./auth'));
  
  
  
    //   //JWT Protescted routes below
  
    //   app.use('/user', verifyJWT); //verify the request only then move to the next route
    //   app.use('/user', require('./user'));
    //   app.use('/market', require('./market'));

    //404 handler
    app.use('*', (req, res) => {
        res.status(404).json({
            message: 'Oops! The resource you are looking for is not found :)'
        })
    });

}

module.exports = rootRouter;