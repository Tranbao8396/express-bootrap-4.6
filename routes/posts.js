var express = require('express');
var postsRouter = express.Router();
var Post = require('../models/posts');


postsRouter.get('/', async (req, res, next) => {
    const post_table = await Post.find();
    res.render('posts/', { title: 'Posts', post_table });
});

postsRouter.get('/create', function (req, res, next) {
    res.render('posts/create', { title: 'Add New' });
});

postsRouter.post('/create', async (req, res) => {
    const { name, content } = req.body;
    const post = await Post.create({ name, content });
    res.redirect(`/posts`);
});

postsRouter.get('/delete/:id', async (req, res, next) => {
    await Post.remove({ _id: req.params.id });
    res.redirect(`/posts`);
});

postsRouter.get('/edit/:id', async (req, res, next) => {
    const id = req.params.id;
    const post = await Post.findById(id);
    res.render('posts/edit', { title: 'Edit', id, post });
});

postsRouter.post('/edit/:id', async (req, res, next) => {
    const { name, content } = req.body;
    const id = req.params.id;
    const post = await Post.findByIdAndUpdate(
        id,
        { $set: { name, content } },
    );
    res.redirect(`/posts`);
});

module.exports = postsRouter;
