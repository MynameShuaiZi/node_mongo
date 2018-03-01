var express = require('express');
var router = express.Router();
var products=require("../controllers/products.controller");

router.route('/list')
      .get(products.list);
router.route('/details')
    .get(products.details);
router.route('/testDrive')
    .get(products.testDrive);
router.route('/testUser')
    .post(products.testUser);
//router.route('/index')
//	.get(products.index)
router.route("/carosel").get(products.carosel);
module.exports = router;