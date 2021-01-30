const jwt =require('jsonwebtoken');
 const auth =(req,res,next)=>{
 	try{
 		const token =req.headers['x-access-token'];
 		if(!token)
 			return res.status(403).send({auth:false,message:'no token found'})
 		jwt.verify(token,process.env.KEY_JWT,(err,decoded)=>{
            if(err)
            	return res.status(500).json({auth:false,message:'failed for token authentiation'})
            req.User_id=decoded.User_id;
            req.User_role=decoded.User_role;
 		});

 	}catch(error){
 		res.status(500).json({error})
 	}
 }
 module.exports=auth;