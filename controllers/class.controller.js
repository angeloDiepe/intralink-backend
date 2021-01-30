const Class =require('../models/Class.model.js');
const User=require('../models/User.model.js')
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
// const auth = require('../middlewares/auth');
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

module.exports.AdhereClass=async (req,res,next)=>{
	const {Code,Id,Name}=req.body

  console.log(req.body)
  //http://localhost:8080/user/profil/

    /*lorsqu'un user veut adherer a une classe il fournit le code
     de la classe et le systeme lui retourne l'id de la class qu'il
      va stocker dans l'attribut Class de sa table*/

	const Classe= await Class.findOne({Code_class:Code}) 
  console.log(Classe)
	let user= await User.findOne({_id:Id})
	try{
      //check if user is ulready in the classe
       await  user.Class.map(classe=>{
          if (classe.id==Classe._id) {
            res.json({joined:true})
          }
        })
       //if user is not in the class this code are executed
            user.Class.push({id:Classe._id,Name:Classe.Name})
            const Myclass=user.Class
            console.log('class',Myclass)
            await User.updateOne({_id:Id},{Class:Myclass})
            .then(data=>{
              console.log(data)
                //ajout du nouveau membre a la liste des membres
                Classe.Members.push({Id:Id,Name:Name})
                let members=Classe.Members
                 Class.updateOne({Code_class:Code},{Members:members})
                .then(result=>console.log(result))
                .catch(err=>res.status(404).json(err.message))
                res.status(200).json(Classe)
            })
            .catch(err=>res.status(500).json({error:err.message}))
        }
    catch{
        res.status(404).json('invalid code')
    }
}
module.exports.GetClass=(req,res,next)=>{
  Class.find()
  .then(data=>res.status(200).json({Classes:data}))
  .catch(err=>res.status(500).json(err.message))
}
module.exports.getUserClass=async (req,res,next)=>{
    const Id=req.params.id
  // Id="5fcde56d1ef6cf10280546cc"
  let id=""
  let Classes=[];
    try{
      User.findOne({_id:Id})
      .then(async data=>{console.log(data.Class.length)

          for (var i = 0; i < data.Class.length; i++) {
            id=data.Class[i].id
          await  Class.findOne({_id:id})
            .then(data=>{console.log(data)
              Classes.push(data)})
            .catch(err=>res.status(500).json(err.message))
          }
          res.status(200).json({Classes:Classes})

      })
    }catch{err=>res.status(500).json('id not send')}
}
module.exports.GetClassbyTeacher=(req,res,next)=>{
    const {Author}=req.body
    Class.find({Author})
    .then(data=>res.status(200).json(data))
    .catch(err=>res.status(500).json(err.message))
}
module.exports.deleteAllClass=(req,res,next)=>{
    Class.remove()
    .then(data=>res.status(200).json(data))
    .catch(err=>res.status(500).json(err.message))
}
module.exports.createClass=(req,res,next)=>{
    function GenerateCode() {
        return Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    }
    const Code=GenerateCode()
    console.log(req.files)
    const NewClass=new Class({...req.body,Code_class:Code,Cours:req.files.cours,Homework:req.files.homework,Date_create:Date.now()})
    NewClass.save()
    .then(data=>res.status(200).json({message:"Class was be created"}))
    .catch(err=>res.status(500).json({error:err.message}))
}
module.exports.updateClass=(req,res,next)=>{
let Cours=[];
let Homework=[]
  if (req.files===undefined) {
    console.log(req.body)
    Class.findOneAndUpdate({_id:req.params.id},{...req.body})
    .then(data=>res.status(200).json({message:`Class ${data.Name} was be updated`}))
    .catch(err=>res.status(500).json({error:err.message}))  
  }else{
    Class.findOne({_id:req.params.id})
      .then(async data =>{
        Cours=data.Cours;
        Homework=data.Homework
        if (req.files.homework!=undefined && req.files.cours===undefined) {
          for (var i = 0; i < req.files.homework.length; i++) {
            Homework.push(req.files.homework[i])
          }
        }else if(req.files.homework===undefined && req.files.cours!=undefined){
          for (var i = 0; i < req.files.cours.length; i++) {
            Cours.push(req.files.cours[i])
          }
        }
          await Class.updateOne({_id:req.params.id},{...req.body,Cours:Cours,Homework:Homework})
          .then(update=>res.status(200).json({message:`Class ${data.Name} was be updated`}))
          .catch(err=>res.status(500).json({error:err.message})) 
     })
    .catch(err=>res.status(500).json({error:err.message})) 
  }
}
// endpoind for download one cour
module.exports.getCour=async (req, res) => {
console.log(req.params)
  await Class.find({_id:req.params.id})
  .then(data=>{
    if (data.length===0) {
      res.status(404).json('document not found')
    }else{
      for (var i = 0; i < data[0].Cours.length; i++) {
        // console.log(data[0].Cours[i].md5)

       if( data[0].Cours[i].filename===req.params.filename)
       {
            gfs.files.findOne({ filename:data[0].Cours[1].filename }, (err, file) => {
              // Check if file
              if (!file || file.length === 0) {
                return res.status(404).json({
                  err: 'No file exists'
                });
              }
              const readstream = gfs.createReadStream(file.filename);
              return readstream.pipe(res);
            });
       }
    }
    }
  })
    
  .catch(err=>console.log(err))
};
// endpoind for download one Homework
module.exports.getHomework=async (req, res) => {
  await Class.find({_id:req.params.id})
  .then(data=>{
    if (data.length===0) {
      res.status(404).json('document not found')
    }else{
      for (var i = 0; i < data[0].Homework.length; i++) {
        // console.log(data[0].Homework[i].md5)

       if( data[0].Homework[i].filename===req.params.filename)
       {
            gfs.files.findOne({ filename:data[0].Homework[1].filename }, (err, file) => {
              // Check if file
              if (!file || file.length === 0) {
                return res.status(404).json({
                  err: 'No file exists'
                });
              }
              const readstream = gfs.createReadStream(file.filename);
              return readstream.pipe(res);
            });
       }
    }
    }
  })
    
  .catch(err=>console.log(err))
};