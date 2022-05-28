//import
const express = require('express'),
    { createPathAdmin, createPathAdminPost } = require('../lib/UIpath'),
    { getAddPost, createPost, editPost, delPost } = require('../../app/controllers/admin-contoller'),
    perms = require('../../app/middleware/permisson'),
    { render } = require('express/lib/response'),
    db = require('mongoose');
const Post = require('../../app/models/post');


//create router
const router = express.Router();

//prems
const Admin = 'ADMIN'

//redirect
router.get(['/admin', '/admins'], (req, res) => {
    res.redirect('/admin/index');
});

//#####################################################
//#
//#                Get запросы 
//# 
//#######################################################

//Index
router.get('/admin/index', perms(Admin), (req, res) => {
    res.render(createPathAdmin('index'))
});
//Add Post
router.get('/admin/add-post', perms(Admin), getAddPost);
//Edit post
router.get('/admin/edit-post', perms(Admin), (req, res) => {
    res.render(createPathAdminPost('edit-post'));
});
//Remove post
router.get('/admin/del-post', perms(Admin), (req, res) => {
    res.render(createPathAdminPost('del-post'));
});


//Add Post
router.post('/admin/add-post', perms(Admin), createPost)
//Edit post
router.post('/admin/edit-post', perms(Admin), editPost)

router.post('/admin/del-post', perms(Admin), delPost)

//export module
module.exports = router;