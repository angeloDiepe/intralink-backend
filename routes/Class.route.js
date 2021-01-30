const express=require('express');
const router=express.Router();
const Class=require('../controllers/class.controller.js')
const CLASS=require('../models/Class.model.js')
const upload=require('../middlewares/upload.js')

/***********************************************************************************************************************************************/


router.post('/adhere',Class.AdhereClass);

router.get('/',Class.GetClass);

router.get('/teacher',Class.GetClassbyTeacher);

router.get('/Cour/:id/:filename',Class.getCour);

router.get('/Homework/:id/:filename',Class.getHomework);

router.get('/:id/',Class.getUserClass);

router.delete('/',Class.deleteAllClass);

router.post('/',upload,Class.createClass);

router.put('/:id/update',upload,Class.updateClass);



module.exports=router;