var express = require('express');
var homeRouter = require('./home');
var postsRouter = require('./posts');
var usersRouter = require('./users');
var appRouter = express.Router();

/* GET home page. */
appRouter.get('/', function(req, res, next) {
  res.render('login', { title: 'Dashboard', layout: "login.hbs" });
});

appRouter.use('/home', homeRouter);
appRouter.use('/posts', postsRouter);
appRouter.use('/users', usersRouter);

module.exports = appRouter;
