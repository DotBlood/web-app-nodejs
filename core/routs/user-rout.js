const express = require('express');
const { createPathUser } = require('../lib/UIpath');
const { Register, Login } = require('../../app/controllers/auth-controller')
const authMe = require('../../app/middleware/authMe')
const chekLogin = require('../../app/middleware/chekLogin')


//create router
const router = express.Router();


//routs
router.get(['/user', '/users', '/u'], (req, res) => {
    res.redirect('/user/login');
});


//auth
router.get('/user/login', chekLogin,(req, res) => {
    res.render(createPathUser('login'));
});
router.get('/user/register', chekLogin,(req, res) => {
    res.render(createPathUser('register'))
});



//cb
router.get('/user/help', authMe ,(req, res) => {
    res.render(createPathUser('help'))
});


router.post('/user/register', Register);
router.post('/user/login', Login)



//export module
module.exports = router;