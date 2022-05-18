const Post = require('../models/post');
const {
    createPathAdminPost,
    createPath
} = require('../../core/lib/UIpath');


// handlers error
const handlError = (res, error) => {
    console.log(error);
    res.render(createPath('errors'), { title: 'Error' });
};


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
        .catch((error) => handlError(res, error));
}


module.exports = {
    getAddPost,
    createPost,
};