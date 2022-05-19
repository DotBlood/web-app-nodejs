//import
const express = require('express');
const {createPath} = require('../lib/UIpath');


//create router
const router = express.Router();


//routs
router.get(['/', '/index', '/index.html', '/home', '/main'], (req, res) => {
    const title = 'Дабро пожаловать!';
    res.render(createPath('index'), { title });
});


router.get('/services', (req, res) => {
    const title = 'Наши услуги';
    res.render(createPath('services'), { title });
});


router.get(['/questions', '/qui'], (req, res) => {
    const title = 'Задайте нам свой вопрос';
    res.render(createPath('questions'), { title });
});

//export module
module.exports = router;