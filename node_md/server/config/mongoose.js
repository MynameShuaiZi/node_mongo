var mongoose=require("mongoose");
mongoose.Promise=global.Promise;
mongoose.connect(require("./config").db,{useMongoClient:true});
require("../models/user.model");
require("../models/product.model");
require("../models/index.model");
require("../models/TestDrive.model");