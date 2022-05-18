const Post = require('../models/post');
const error = require('../../core/lib/handlError');
const { createPathAdminPost, } = require('../../core/lib/UIpath');


const getAddPost = (req, res) => {
    const title = 'Добавить пост';
    res.render(createPathAdminPost('add-post'), { title });
};


const createPost = (req, res) => {
    const { title, author, description, img } = req.body;
    const post = new Post({ title, author, description, img })
    post
        .save()
        .then((result) => res.redirect('/posts'))
        .catch((error) => error(res, error));
}


module.exports = {
    getAddPost,
    createPost,
};