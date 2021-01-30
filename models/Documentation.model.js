const mongoose=require('mongoose');

const DocumentationSchema=mongoose.Schema({
	_id:String,
	Document:{
		Filename:String,
		Chunksize:Number,
		_id:String,
		UploadDate:Date,
		Md5:String,
		isImage:Boolean,
		Length:Number
	},
	date_creation:Date,
	date_consultation:[Date],
	id_createur:{
		type:String,
		required:true
	}
	Nom_Consulteur:[String]
})

module.exports=mongoose.model('Documentation',DocumentationSchema)