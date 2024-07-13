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
    message_text:{
        type:String,
        required:true
    },
    sent_datetime:{
        type:String,
        required:true
    },
    contact_id:{
        type:String,
        required:true
    },
    is_read:{
        type:Boolean,
        default:false
    },
    group_id:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('Message',messageSchema);
