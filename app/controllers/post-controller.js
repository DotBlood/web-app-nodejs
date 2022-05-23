// imports
const Post = require('../models/post');
const {createPath} = require('../../core/lib/UIpath');
const errors = require('../../core/lib/handlError');


//controllers
const getPost = (req, res) => {
    Post
        .findById(req.params.id)
        .then((post) => res.render(createPath('post'), { post }))
        .catch((error) => error(res, error));
};


const getPosts = (req, res) => {
    const title = 'Новости';
    Post
        .find()
        .sort({ createdAt: -1 })
        .then((posts) => res.render(createPath('posts'), { posts, title }))
        .catch((error) => errors(res, error));
};


module.exports = {
    getPost,
    getPosts,
};
