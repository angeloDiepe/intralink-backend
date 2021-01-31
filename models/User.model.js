const mongoose=require('mongoose');


const UserSchema=mongoose.Schema({
	Name:{
			type:String,
			required:true

		},
	Surname:{
			type:String,
		},
	Pseudo:{
			type:String,
			required:true

		},
	Phone:{
			type:Number,

		},
	Email:{
		type:String,
		required:true,
		unique:true

	},
	Password:{
		type:String,
		required:true
	},
	Role:String,
	Filiere:{
		type:String,
	},
	Niveau:{
		type:Number
	},
	Departement:{
		type:String
	},
	Formation:String,
	Gender:String,
	Class:[{id:String,Name:String}],
	Group:[{id:String,Name:String}],
	Image:{
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
	}
})
module.exports=mongoose.model('User',UserSchema);