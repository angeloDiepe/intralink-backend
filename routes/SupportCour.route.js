const express = require('express')
const router = express.Router();
const supportForum = require('../controllers/SupportCour.controller');

router.get('/', supportForum.getAllSupport)
router.get('/:filename', supportForum.getOneSupport)
// router.post('/upload', supportForum.postSupport)
router.delete('/:_id', supportForum.deleteOneSupport)




const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoURI = process.env.MONGO_URI;
const mongoose=require('mongoose')
const Support=require('../models/Cours.models.js')
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
  file: async (req, file) => {
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

const upload = multer({ storage });

/********ROUTES*****************************/
router.post('/', upload.single('file'), async (req, res,next) => {
  const support=new Support({supports:req.file})
    await  support.save()
      .then(()=>console.log('Done'))
      .catch(error=console.log('error'))


    // console.log(upload.field)
res.redirect('/Doc');
}
);
module.exports = router;