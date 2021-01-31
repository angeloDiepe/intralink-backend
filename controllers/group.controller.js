const Group=require('../models/Group.model.js')

module.exports.createGroup=(req,res,next)=>{
	const {Name}=req.body
	const group=new Group({
		Name:Name
	})
	group.save()
	.then(group=>res.status(200).json({Group:group}))
	.catch(console.log)
}