// imports
const Post = require('../models/post');
const createPath = require('../../core/lib/UIpath');

// handlers error
const handlError = (res, error) => {
    console.log(error);
    res.render(createPath('errors'), { title: 'Error' });
};

//controllers
const getPost = (req, res) => {
    Post
        .findById(req.params.id)
        .then((post) => res.render(createPath('post'), { post }))
        .catch((error) => handlError(res, error));
};

const getPosts = (req, res) => {
    const title = 'Новости';
    Post
        .find()
        .sort({ createdAt: -1 })
        .then((posts) => res.render(createPath('posts'), { posts, title }))
        .catch((error) => handlError(res, error));
};

const getAddPost = (req, res) => {
    const title = 'Добавить пост';
    res.render(createPath('add-post'), { title });
};

const createPost = (req, res) => {
    const { title, author, description, img } = req.body;
    const post = new Post({ title, author, description, img })
    post
        .save()
        .then((result) => res.redirect('posts'))
        .catch((error) => handlError(res, error));
}


module.exports = {
    getPost,
    getPosts,
    getAddPost,
    createPost,
};
