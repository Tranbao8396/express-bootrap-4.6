var express = require('express');
var usersRouter = express.Router();
var User = require('../models/users');

usersRouter.get('/', async (req, res, next) => {
    res.render('users/', { title: 'Users' });
});

usersRouter.get('/register', async (req, res, next) => {
    res.render('users/register', { title: 'Register Your Account' });
});

usersRouter.post('/register', async (req, res) => {
    const { username, usermail, userpassword } = req.body;
    const adduser = await User.create({ username, usermail, userpassword });
    res.redirect('/users')
});

module.exports = usersRouter;