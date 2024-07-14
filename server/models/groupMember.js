const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const groupMemberSchema=new Schema({
    group_id:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    },
    joined_datetime:{
        type:Date,
        default:Date.now
    },
    is_admin:{
        type:Boolean,
        default:false
    },
    left_datetime:{
        type:String
    }
});

module.exports=mongoose.model('GroupMember',groupMemberSchema);