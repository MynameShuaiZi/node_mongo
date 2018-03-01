var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var productSchema=new Schema({

	"productId":Number,
	"familyId":Number,
	"familyImage":String,
	"productTitle":String,
	"price":Number,
	"infoCode":String,
	"carType":String,
	"imperialroom":String,
	"emiStandard":String,
	"engine":String,
	"driving":String,
	"images":[],
	"kw":String,
	"detailsImg":[],
	"detailsImages":[]
},
	{"versionKey":false}
);
module.exports=mongoose.model("Product",productSchema,"product");
