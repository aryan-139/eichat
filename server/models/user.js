const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    user_id:{
        type:String,
        required:true,
        unique: true 
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
    },
    profile_pic:{
        type:String
    },
});

const User=mongoose.model('User',userSchema);
module.exports=User;