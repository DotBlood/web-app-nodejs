/*
 * Роуты для пользывателей, а так же авторизация
 */


//библиотеки
const express = require('express'),
    { createPathUser } = require('../lib/UIpath'),
    { Register, Login } = require('../../app/controllers/auth-controller'),
    authMe = require('../../app/middleware/authMe'),
    chekLogin = require('../../app/middleware/chekLogin'),
    { ChatHistory } = require('../../app/controllers/Chat-controller')


//create router
const router = express.Router();



//#####################################################
//#
//#                    GET
//# 
//#####################################################

//Register
router.get('/user/register', chekLogin, (req, res) => {
    res.render(createPathUser('register'))
});
//Login 
router.get('/user/login', chekLogin, (req, res) => {
    res.render(createPathUser('login'));
});
//Help
router.get('/user/help', authMe, (req, res) => {
    res.render(createPathUser('help'))
});
router.get('/user/page', authMe, (req, res) => {
    const title = 'Личный кабинет'
    res.render(createPathUser('page'), { title })
});

router.get('/user/chat', authMe, ChatHistory)


//#####################################################
//#
//#                     POST 
//# 
//#####################################################

//Register
router.post('/user/register', chekLogin, Register);
//Login
router.post('/user/login', chekLogin, Login)


//####################################################
//
//                  Redirect
// 
//####################################################


router.get(['/user', '/users', '/u'], (req, res) => {
    res.redirect('/user/login');
});


//export module
module.exports = router;