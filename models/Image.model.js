const mongoose=require('mongoose');

const ImageSchema=mongoose.Schema({
	photo:{
		type:Buffer
	}
});

ImageSchema.methods.toJSON=()=>{
	const result=this.toObject();
	delete result.photo;
	return result;
}

module.exports=ImageSchema; 