const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    contact_id:{
        type:String,
        required:true
    },
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String
    },
    phone_number:{
        type:String,
        required:true
    },
});

module.exports=mongoose.model('User',userSchema);