const jwt =require('jsonwebtoken');
const bcrypt=require('bcrypt');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const User =require('../models/User.model.js');
const Group=require('../models/Group.model.js');

// Mongo URI
const mongoURI = process.env.MONGO_URI;

// Create mongo connection
const conn = mongoose.createConnection(mongoURI,{ useUnifiedTopology: true ,useNewUrlParser: true});


// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);  
  gfs.collection('uploads');
});
useNewUrlParser: true


/***********/
const AddUser=(filiere,name,id,pseudo)=>{

  Group.update({Name:checkUserGroup(filiere)},{$push:{"Member":{Name:name,Id:id,Pseudo:pseudo}}})
  .then(console.log)
  .catch(console.log)
}
const checkUserGroup=(filiere)=>{
  switch(filiere){
    case 'GI':
    return "GI Official"
    break;
    case 'GRT':
    return"GRT Official"
    break;
    case 'GBM':
    return"GBM Official"
    break;
    case 'GEII':
    return"GEII Official"
    break;
  }
}
module.exports.Login=(req,res,next)=>{
	const {Email,Password}=req.body;
    console.log(req.body)
	User.findOne({Email})
	.then(user=>{
		if(!user)
			return res.status(404).json({message:'not found !',code:404});
		let valid=bcrypt.compareSync(Password,user.Password);
		if(!valid)
			return res.status(401).json({message:{auth:false,token:null}});
		let token=jwt.sign({user:user},'secureKey',{expiresIn:86400});
		res.status(200).json({message:{auth:true,token:token,User:user}});
	})
	.catch(err=>{console.log(err),res.status(500).json({error:err.message})})
}

module.exports.SignUp=(req,res,next)=>{
    const {Email,Password,Phone,Name,Surname,Pseudo,Role,Niveau,Filiere,Departement,Formation,Gender}=req.body;
    console.log(checkUserGroup(Filiere))
    let GROUP=[];
    GROUP.push({Name:checkUserGroup(Filiere)})
    let role="";
     if(Role===undefined){
      role="etudiant"
    }else{role=req.body.Role}
    bcrypt.hash(Password,10)
    .then(hash=>{
      console.log(hash)
    	const user= new User({
    		Password:hash,
    		Email,
    		Name,
    		Surname,
    		Role:role,
    		Phone,
    		Pseudo,
        Niveau,
        Departement,
        Filiere,
        Formation,
        Gender,
        Group:GROUP
    	})
    	user.save()
    	.then(async user=>{
            
           if(!user)
           	return res.status(404).json({error:"user are not created"})
            let token =jwt.sign({user:user},"superSecre@Key007",{expiresIn:86400});
            await AddUser(Filiere,Name,user._id,Pseudo);
            res.status(200).json({auth:true,token:token,message:'good',user:user});
            console.log(user)
           })
    	.catch(error=>console.log(error))
    	})
    .catch(error=>console.log(error))
}
module.exports.GetUser=(req,res,next)=>{
    User.find({})
    .then(user=>res.status(200).json({USERS:user}))
    .catch(error=>console.log(error))
}
module.exports.GetOneUser=(req,res,next)=>{
    const {id}=req.params.id
    User.findOne({id})
    .then(user=>res.status(200).json({USERS:user}))
    .catch(error=>console.log(error))
}
module.exports.DeleteUser=(req,res,next)=>{
    User.findByIdAndRemove(req.params.id)
      .then(user => {
        res.status(200).json({ message: `User ${user.Name} was deleted`});
    })
      .catch(err => res.status(500).json({ error: err.message }))
}
module.exports.UpdateUser=(req,res,next)=>{
    const {id}=req.params.id
    console.log(req.body)
    if (req.files===undefined) {
      if(req.body.Password===undefined)
      {
       User.findOneAndUpdate({id}, {...req.body}) 
          .then(user => {
            res.status(200).json({message: `User ${user.Name} was updated`});
        })
        .catch(err => res.status(500).json({ error: err.message }))     
    }
    else{
        bcrypt.hash(req.body.Password,10)
        .then(hash=>{
            User.findOneAndUpdate({id}, {...req.body,Password:hash}) 
                  .then(user => {
                    console.log(user)
                    res.status(200).json({message: `User ${user.Name} was updated`});
            })
            .catch(err => res.status(500).json({ error: err.message }))
        })
        .catch(error=>console.log(error))   
      
    }
  }else{
    if(req.body.Password===undefined)
      {
       User.findOneAndUpdate({id}, {...req.body,Image:req.files.Profil[0]}) 
          .then(user => {
            console.log(user)
            res.status(200).json({message: `User ${user.Name} was updated`});
        })
        .catch(err => res.status(500).json({ error: err.message }))     
    }
    else{
        bcrypt.hash(req.body.Password,10)
        .then(hash=>{
            User.findOneAndUpdate({id}, {...req.body,Password:hash,Image:req.files.Profil[0]}) 
                  .then(user => {
                    console.log(user)
                    res.status(200).json({message: `User ${user.Name} was updated`});
            })
            .catch(err => res.status(500).json({ error: err.message }))
        })
        .catch(error=>console.log(error))   
      
    }
  }
}

module.exports.GetProfilImage=async (req, res) => {

  await User.find({_id:req.params.id})
  .then(data=>{
    gfs.files.findOne({ filename:data[0].Image.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
      const readstream = gfs.createReadStream(file.filename);
      return readstream.pipe(res);
    });
  })
  .catch(err=>res.status(500).json(err.message))
};
