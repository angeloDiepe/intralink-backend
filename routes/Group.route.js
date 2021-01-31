const express=require('express');
const router=express.Router();
const Group=require('../controllers/group.controller.js')

/***********************************************************************************************************************************************/

router.post('/',Group.createGroup);



module.exports=router;