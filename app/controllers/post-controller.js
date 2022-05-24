// imports
const Post = require('../models/post');
const { createPath } = require('../../core/lib/UIpath');
const errors = require('../../core/lib/handlError');


//controllers
async function getPost(req, res) {
    await Post
        .findById(req.params.id)
        .then((post) => res.render(createPath('post'), { post }))
        .catch((error) => errors(res, error));
};


async function getPosts(req, res) {
    const title = 'Новости';
    await Post
        .find()
        .sort({ createdAt: -1 })
        .then((posts) => res.render(createPath('posts'), { posts, title }))
        .catch((error) => errors(res, error));
};


module.exports = {
    getPost,
    getPosts,
};
