const mongoose=require('mongoose');
const Messages=require('./Message.model.js')
const ConversationSchema=mongoose.Schema({
	_id:String,
	Pseudo_expediteur:{
		type:String,
		required:true
	},	Pseudo_destinataire:{
		type:String,
		required:true
	},
	Date_creation:Date,
	Date_destinataire:Date,
	Messages:[Messages]
})
module.exports=mongoose.model('Conversation',ConversationSchema);