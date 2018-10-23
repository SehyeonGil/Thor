var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.passport);
  res.render('index', { title: 'Express' ,passport:req.session.passport});
});

module.exports = router;
