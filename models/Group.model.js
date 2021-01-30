const mongoose=require('mongoose');
const Messages=require('Message.js')
const GroupSchema=mongoose.Schema({
	_id:String,
	Nom:{
		type:String,
		required:true
	},
	Admins:[String],
	Member:[String],
	Messages:[Messages]
})
module.exports=mongoose.models('Group',GroupSchema)