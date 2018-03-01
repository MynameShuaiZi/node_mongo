var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var indexSchema=new Schema({
    "banner":[],
    "floorImg1":[],
    "floorImg2":[],
    "floorImg3":[]
    },
    {
        navImg1:[],
        navImg2:[]
    }
);
module.exports=mongoose.model("Index",indexSchema);
