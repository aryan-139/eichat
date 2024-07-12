const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const groupSchema=new Schema({
    group_id:{
        type:String,
        required:true
    },
    group_name:{
        type:String,
        required:true
    },
    group_description:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('Group',groupSchema);