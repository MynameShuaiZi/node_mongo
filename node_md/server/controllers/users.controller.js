var mongoose=require("mongoose");
var User=mongoose.model("User");
var Product=require("mongoose").model("Product");
exports.isLogin=(req,res)=>{
	if(!req.session.userId){
		return res.send({ok:0,msg:"用户未登录"});
	}else{
		return res.send({ok:1,meg:req.session.userName})
	}
};
exports.login=(req,res,next)=>{
	var user=new User(req.body);
	User.findOne({userName:user.userName,userPassword:user.userPassword}).then(doc=>{
		if(doc){
			req.session.userId=doc._id;
			req.session.userName=doc.userName;
			res.send({ok:1,msg:doc.userName});
		}else{
			res.send({ok:0,msg:"用户名或密码错误"});
		}
	})
};

exports.validateName=(req,res)=>{
	User.findOne({userName:req.body.userName}).then(user=>{
		if(user){
			res.send({ok:0,msg:"用户名已存在"});
		}else{
			res.send({ok:1,msg:"用户名可用"});
		}
	})

};
exports.register=(req,res)=>{
	if(!req.session.userId){
		var user=new User(req.body);
		user.save().then(user=>{
			res.send({ok:1,msg:'注册成功'});
		}) .catch(err=>{
			console.log(err);
			req.session.msg=getErrorMessage(err);
			res.send({ok:0,msg:err.message});
		})
	}
};
exports.logout=(req,res)=>{
	req.session.userId=null;
	res.redirect("/");
};

exports.search=(req,res,next)=>{
	let kw =req.query.kw;
	var arr=kw.split(" ");
	var str=arr.join("|");
	var reg =new RegExp(`${str}`,"ig");
	console.log(1);
	Product.find({kw:reg}).then(docs=>{
		console.log(docs);
		res.json(docs);

	}).catch(err=>{
		res.json({ok:0,err:err.message})
	})
};