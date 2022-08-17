var express = require('express');
var homeRouter = express.Router();

/* GET users listing. */
homeRouter.get('/', function(req, res, next) {
  res.render('home', {title: 'Home'});
});

module.exports = homeRouter;
