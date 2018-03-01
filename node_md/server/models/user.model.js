var mongoose = require('mongoose');

var userSchema=new mongoose.Schema({
	"userId":String,
	"userName":String,
	"userPassword":String,
	"carList":[
		{
			"productId":Number,
			"familyId":Number,
			"familyImage":String,
			"productTitle":String,
			"price":Number,
			"infoCode":Number,
			"carType":String,
			"imperialRoom":String,
			"emiStandard":String,
			"engine":String,
			"driving":String,
			"images":[],
			"kw":String
		}
	]

},
	{"versionKey":false}
);
module.exports=mongoose.model("User",userSchema);
