const { redirect } = require('express/lib/response');

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") { next() }
    try {
        const token = req.cookies['Token']
        if (!token) {
            next()
        } else {
            res.cookie('success', 'Вы уже авторизованы!', { expires: new Date(Date.now() + 1000), httpOnly: false })
            return res.redirect('/')
        }
    } catch (e) {
        console.log(e)
        return res.status(403).redirect('/user/login')
    }
};