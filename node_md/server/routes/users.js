var express= require("express");
var router=express.Router();
var users=require("../controllers/users.controller");
router.route("/isLogin").get(users.isLogin);
router.route("/login").post(users.login);
router.route("/validateName").post(users.validateName);
router.route("/register").post(users.register);
router.route("/logout").get(users.logout);
router.route("/search").get(users.search);

module.exports=router;
