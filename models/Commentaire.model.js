const mongoose=require('mongoose');
const CommentaireSchema=mongoose.Schema({
	Nom_user:{
		type:String
	},
	date_creation:Date
})
module.exports=CommentaireSchema;


