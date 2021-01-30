const express =require('express');
const router=express.Router();
const Article=require('../controllers/article.controller.js')
const Article_model=require('../models/Article.model.js')
const bodyParser = require('body-parser');
 const path = require('path');
 const mongoose = require('mongoose');
const multer = require('multer');
 const GridFsStorage = require('multer-gridfs-storage');
 const Grid = require('gridfs-stream');
 const methodOverride = require('method-override');

 // Mongo URI
 const mongoURI = process.env.MONGO_URI;
  //Create mongo connection
 const conn = mongoose.createConnection(mongoURI,{ useUnifiedTopology: true ,useNewUrlParser: true});

  //Init gfs
 let gfs;

 conn.once('open', () => {
   // Init stream
   gfs = Grid(conn.db, mongoose.mongo);  
   gfs.collection('uploads');
 });
 useNewUrlParser: true
  //Create storage engine
 const storage = new GridFsStorage({
   url: mongoURI,
   file: (req, file) => {
     return new Promise((resolve, reject) => {
         const filename = file.originalname;
         const fileInfo = {
           filename: filename,
           bucketName: 'uploads'
         };
          resolve(fileInfo);
     });
   }
 });

 const upload = multer({ storage }).single('file');

router.get('/',Article.GetArticle)
router.get('/:id',Article.GetOneArticle)
router.get('/image/:id',Article.getArticleImage)
router.delete('/:id/delete',Article.DeleteArticle)


router.post('/',upload,async (req,res,next)=>

{
   console.log(req.file)
	const {Title}=req.body
   		const article =new Article_model({...req.body,Image:req.file})
   		await article.save()
	   .then(article=>res.status(200).json({message:"article is create"}))
	   .catch(error=>res.status(500).json({error:error.message}))
  
})
router.put('/:id/update',upload,(req,res,next)=>{
  console.log(req.file)
    const {id}=req.params.id
    Article_model.updateOne({id}, {...req.body,Image:req.file}) 
    .then(article => {
      res.status(200).json({message: `Article ${article.Title} was updated`});
    })
    .catch(err => res.status(500).json({ error: err.message }))
})
router.put('/:id/view',Article.increaseView)


module.exports=router;