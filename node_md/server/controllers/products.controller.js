var Product=require("mongoose").model("Product");
var Index=require("mongoose").model("Index");
var TestDrive=require("mongoose").model("TestDrive");
exports.carosel=(req,res,next)=>{
	//res.json({code:1,msg:"aaaa"});
	Index.find().then(doc=>{
		res.json(doc);
	}).catch(err=>{
		console.log(err.message);
	})
}

exports.list=(req,res,next)=>{
		let	pageNumber=parseInt(req.query.pageNumber),
			pageSize=parseInt(req.query.pageSize),
			skip=(pageNumber-1)*pageSize,
			limit=pageSize,
			pageCount=null,
			totalCount=null,
			kw=req.query.kw,
			arr=null,
			str=null,
			reg=null,
			sort={}
	// console.log('========'+typeof(kw));

	if(kw==""){
	Product.find().then(docs=>{
			pageCount = Math.ceil(docs.length / pageSize);
			totalCount = docs.length;
			Product.find().skip(skip).limit(limit).exec().then(docs=> {
						docs.push({pageCount: pageCount, totalCount: totalCount})
				console.log(docs);
				res.json(docs)
					}).catch(err=>{
						console.log(err)
					})
	}).catch(err=>{
		console.log(err)
	})}
	if(kw!=""){
		arr=kw.trim().split(' ')
		var _arr=arr


	Product.find().then(docs=>{
		let outPut=[]
		for(let v of docs){
			let hasKw=true
			//console.log(v.kw)
			for(let _v of _arr){
				//console.log(_v);
				if(v.kw.indexOf(_v)==-1) {
					hasKw=false
				}
			}
			if(hasKw){
				outPut.push(v)
			}
		}
		//console.log(outPut);
		let arr2=outPut.slice(skip,skip+limit)
        pageCount = Math.ceil(arr2.length / pageSize);
        totalCount = arr2.length;
		arr2.push({pageCount: pageCount, totalCount: totalCount});
		res.json(arr2);
	}).catch(err=>{
		console.log(err)
	})}
}

exports.details=(req,res,next)=>{
	Product.findOne(req.query).then(doc=>{
		//console.log(doc);
		var familyId=doc.familyId;
		Product.find({"familyId":familyId}).exec()
			.then(docs=>{
			res.json(docs)
		}).catch(err=>{
			console.log(err)
		})
	})
};

exports.testDrive=(req,res,next)=>{
	let carType=req.query.carType,
		drive=req.query.drive,
		emiStandard=req.query.emiStandard,
		imperialroom=null;
    // console.log(carType);
    // console.log(drive);
    // console.log(emiStandard);
    Product.find({carType:carType,driving:drive,emiStandard:emiStandard}).then(doc=>{
		res.json(doc)
	}).catch(err=>{
		console.log(err);
	})
}
exports.testUser=(req,res,next)=>{
    var Drive=new TestDrive(req.body);
    Drive.save().then(doc=>{
		res.send({ok:1,msg:"提交成功"})
    }).catch(err=>{
        console.log(err);
    })
}

