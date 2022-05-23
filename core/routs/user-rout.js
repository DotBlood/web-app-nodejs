const express = require('express');
const { createPathUser } = require('../lib/UIpath');
const {Register, Login} = require('../../app/controllers/auth-controller')

//create router
const router = express.Router();


//routs
router.get(['/user', '/users', '/u'], (req, res) => {
    res.redirect('/user/login');
});


//auth
router.get('/user/login', (req, res) => {
    res.render(createPathUser('login'));
});
router.get('/user/register', (req, res) => {
    res.render(createPathUser('register'))

    
});



//cb
router.get('/user/help', (req, res) => {
    res.render(createPathUser('help'))
});


//page
router.get('/user/page/:username', (req, res) => {
    res.render(createPathUser('page'))
});


router.post('/user/register', Register);
router.post('/user/login', Login)



//export module
module.exports = router;