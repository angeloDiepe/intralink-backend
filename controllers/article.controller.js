const Article =require('../models/Article.model.js');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
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
// Create storage engine
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


module.exports.GetArticle=(req,res,next)=>{
    Article.find({})
    .then(article=>res.status(200).json({ARTICLE:article}))
    .catch(error=>console.log(error))
}
module.exports.GetOneArticle=(req,res,next)=>{
    const {id}=req.params.id
    Article.findOne({id})
    .then(article=>res.status(200).json({ARTICLE:article}))
    .catch(error=>console.log(error))
}
module.exports.DeleteArticle=(req,res,next)=>{
    Article.findByIdAndRemove(req.params.id)
      .then(article => {
        res.status(200).json({ message: `article ${article.Title} was deleted`});
    })
      .catch(err => res.status(500).json({ error: err.message }))
}

module.exports.getArticleImage=async (req, res) => {

  await Article.find({_id:req.params.id})
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
module.exports.increaseView=(req,res,next)=>{
  const id=req.params.id
  Article.update({_id:id},{$inc:{View:1}})
  .then(data=>res.status(200).json(data))
  .catch(console.log)
}