const mongoose=require('mongoose');
const Messages=require('./Message.model.js')
const ForumSchema=mongoose.Schema({
	_id:String,
	Messages:[Messages],
    id_Classe:{
    	type:String,
    	required:true
    }
})
module.exports=mongoose.module('Forum',ForumSchema);