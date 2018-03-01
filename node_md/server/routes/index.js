var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('00-index.html');
});

module.exports = router;


