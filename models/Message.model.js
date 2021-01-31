const mongoose=require('mongoose');
const MessageSchema=mongoose.Schema({
	User_id:{type:String,required:true},
	Username:{type:String,required:true},
	Message:String,
	File_id:String,
	Audio_id:String,
	File_type:String,
	Is_teacher:Boolean,
	Date_sent:Date
})
module.exports=MessageSchema;