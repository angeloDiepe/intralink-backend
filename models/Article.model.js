const mongoose=require('mongoose')
const Commentaire=require('./Commentaire.model.js')
const Image=require('./Image.model.js')

const ArticleSchema=mongoose.Schema({
	Title:{
		type:String,
		required:true
	},
	Sub_title:{
		type:String
	},
	Content:{type:String},
	Image:{
		filename:String,
		_id:String,
		chunkSize:Number,
		uploadDate:Date,
		md5:String,
		isImage:Boolean,
		length:Number

	},
	Author:String,
	Commentaire:[Commentaire],
	Likes:{type:Number},
	View:{type:Number},
	Date_publish:{type:Date},
})
module.exports=mongoose.model('Article',ArticleSchema)