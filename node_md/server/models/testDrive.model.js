var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var testDriveSchema=new Schema({
    "name":String,
    "phone":Number,
    "type":String,
    "imperialroom":String,
    "emiStandard":String,
    "drive":String,
    "date":String,
    "hour":String,
    "province":String,
    "city":String,
    "buyer":String
});
module.exports=mongoose.model("TestDrive",testDriveSchema);