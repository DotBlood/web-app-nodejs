const res = require('express/lib/response'),
    Post = require('../models/post'),
    error = require('../../core/lib/handlError'),
    { createPathAdminPost, } = require('../../core/lib/UIpath')


function getAddPost(req, res) {
    const title = 'Добавить пост';
    res.render(createPathAdminPost('add-post'), { title });
};


async function createPost(req, res) {
    const { title, author, description, img } = req.body;
    const post = await new Post({ title, author, description, img })
    post
        .save()
        .then((result) => res.redirect('/posts'))
        .catch((error) => error(res, error));
}

async function editPost(req, res) {
    const { _id, title, author, description, img } = req.body;
    try {
        const edit = await Post.findByIdAndUpdate({ _id }, { title, author, description, img }, { new: true })
    } catch (e) {
        console.log(e)
    }
    res.redirect(`/posts/${_id}`)
}

async function delPost(req, res) {
    const { _id } = req.body;
    try {
        const delite = await Post.findByIdAndDelete({ _id }, { new: true })
    } catch (e) {
        console.log(e)
    }
    res.redirect(`/admin/index`)
}

module.exports = { getAddPost, createPost, editPost, delPost }

