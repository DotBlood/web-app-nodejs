const express = require('express');
const createPath = require('../lib/UIpath');

const router = express.Router();


router.get('/', (req, res) => {
    const title = 'Дабро пожалывать!';
    res.render(createPath('index'), {title});
});

router.get('/services', (req, res) => {
    const title = 'Наши услуги';
    res.render(createPath('services'), {title});
});

router.get('/questions', (req, res) => {
    const title = 'Задайте нам свой вопрос';
    res.render(createPath('questions'), { title });
});

module.exports = router;