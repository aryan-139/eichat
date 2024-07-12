require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const router = express.Router();
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./config/connectDB');
const mongoose = require('mongoose');
const corsOption = require('./config/corsConfig');
const http=require('http');
const server=http.createServer(app);
const socketio=require('socket.io');
const io=socketio(server);

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
    server.listen(PORT, () => {
        console.log(`Server is listening at port: ${PORT}`)
    })
})

//socket.io
io.on('connection', (socket) => {
    console.log('a user connected');
});