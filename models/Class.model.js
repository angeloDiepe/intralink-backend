const mongoose=require('mongoose');
const Cours=require('./Cours.models.js')
const Messages=require('./Message.model.js')

const ClassSchema=mongoose.Schema({
	Name:{
		type:String,
		required:true
	},
	Code_class:{
		type:String,
		required:true
	},
	Author:{
		required:true,
	    type:String
	},
	Filiere:{
		type:String
	},
	Niveau:Number,
	Date_create:Date,
	Information_Class:String,
	Members:[{
		Id:String,
		Name:String
	}],
	Cours:[
		{
		_id:String,
		id:String,
		filename:String,
		chunkSize:Number,
		uploadDate:Date,
		md5:String,
		isImage:Boolean,
		length:Number,
		fieldname:String,
		size:Number,
		contentType:String,
		bucketName:String,
		encoding:String,
		mimetype:String

	}],
	Homework:[{
		_id:String,
		id:String,
		filename:String,
		chunkSize:Number,
		uploadDate:Date,
		md5:String,
		isImage:Boolean,
		length:Number,
		fieldname:String,
		size:Number,
		contentType:String,
		bucketName:String,
		encoding:String,
		mimetype:String	
	}],
	Chat:[Messages],
	Start_hour:Number,
	End_hour:Number,
	Day_Cour:String

})

module.exports=mongoose.model('Class',ClassSchema);