//import
const express = require('express'),
    { createPath } = require('../lib/UIpath'),
    router = express.Router(),
    authMe = require('../../app/middleware/authMe')


//routs
router.get(['/', '/index', '/index.html', '/home', '/main'], (req, res) => {
    const title = 'Дабро пожаловать!';
    res.render(createPath('index'), { title })
});



//export module
module.exports = router;