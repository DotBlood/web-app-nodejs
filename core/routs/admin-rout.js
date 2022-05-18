//import
const express = require('express');
const { createPathAdmin } = require('../lib/UIpath');


//create router
const router = express.Router();


//routs
router.get(['/admin', '/admins'], (req, res) => {
    res.redirect('/admin/auth');
});



router.get('/admin/auth', (req, res) => {
    res.render(createPathAdmin('auth'));
});


router.get('/admin/index', (req, res) => {
    res.render(createPathAdmin('index'));
});


//export module
module.exports = router;