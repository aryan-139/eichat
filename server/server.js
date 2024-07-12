require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const router = express.Router();
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./config/connectDB');
const mongoose = require('mongoose');
const corsOption = require('./config/corsConfig')

const PORT =  process.env.PORT|| 8001;

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//setting up all root routes
require('./routes/root')(app);
app.use(cors(corsOption));


//error handler
app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
        console.log(`Server is listening at port: ${PORT}`)
    })
})