const mongoose = require('mongoose');
const databaseUri = process.env.DATABASE_URI

const connectDB = async () => {
    try{
        mongoose.set('strictQuery', true).connect(databaseUri);
    }catch(err){
        console.log(err);
    }
}    

module.exports = connectDB