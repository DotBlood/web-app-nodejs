//import
const express = require('express');
const { createPathAdmin, createPathAdminPost } = require('../lib/UIpath');
const {
    getAddPost,
    createPost
} = require('../../app/controllers/admin-contoller');


//create router
const router = express.Router();


//routs
router.get(['/admin', '/admins'], (req, res) => {
    res.redirect('/admin/auth');
});



router.get('/admin/auth',  (req, res) => {
    res.render(createPathAdmin('auth'));
});


router.get('/admin/index',  (req, res) => {
    res.render(createPathAdmin('index'));
});

router.post('/admin/add-post', createPost);
router.get('/admin/add-post', getAddPost);



//export module
module.exports = router;