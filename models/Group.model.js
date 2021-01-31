const mongoose=require('mongoose');
const Messages=require('./Message.model.js')

const GroupSchema=mongoose.Schema({
	Name:{
		type:String,
		required:true
	},
	Admins:[String],
	Member:[{
		Id:String,
		Name:String,
		Pseudo:String
	}],
	Messages:[Messages],
	Date_create:Date
})
module.exports=mongoose.model('Group',GroupSchema)