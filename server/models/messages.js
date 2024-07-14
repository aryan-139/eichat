const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const messageSchema=new Schema({
    messageId:{
        type:String
    },
    from_user:{
        type:String,
        required:true
    },
    to_user:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    sent_time:{
        type:String,
        required:true
    },
    is_read:{
        type:Boolean,
        default:false
    }
});

module.exports=mongoose.model('Message',messageSchema);
