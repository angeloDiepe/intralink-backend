const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

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
const upload = multer({ storage }).fields([{name:'cours'},{name:'homework'},{name:'Profil'}])

 module.exports=upload;