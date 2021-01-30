const express=require('express');
const router=express.Router();
const upload =require('../middlewares/upload.js')
const User=require('../controllers/user.controller.js')


router.post('/Login',User.Login)
router.post('/SignUp',User.SignUp)
router.get('/users',User.GetUser)
router.get('/user/:id',User.GetOneUser)
router.get('/user/profil/:id',User.GetProfilImage)
router.delete('users/:id/delete',User.DeleteUser)
router.put('/users/:id/update',upload,User.UpdateUser)
module.exports=router;