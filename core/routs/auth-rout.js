const express = require('express');
const { createPathUser } = require('../lib/UIpath');
const {
    Register,
    Login,
    getUsers,
} = require('../../app/controllers/auth-controller');

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





// settings
router.get('/user/setings', (req, res) => {
    res.render(createPathUser('setings'))
});




//page
router.get('/uer/page/:id', (req, res) => {
    res.render(createPathUser('page'))
});


//router.post('/user/register', Register);
//router.post('user/login', Login)
//router.get('/user/page/:id', getUsers);








//export module
module.exports = router;