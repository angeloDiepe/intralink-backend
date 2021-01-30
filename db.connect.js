const mongoose=require('mongoose');

mongoose.connect(process.env.MONGO_URI,
{
	useNewUrlParser:true,
	useUnifiedTopology:true,
	useCreateIndex:true,
	useFindAndModify:true,
	useFindAndModify:false
})
.then(()=>console.log('db is successfully connected !'))
.catch(()=>console.log('connection to db failed !'))

module.exports=mongoose;