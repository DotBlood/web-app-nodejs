const { redirect } = require('express/lib/response');

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") { next() }
    try {
        const token = req.cookies['Token']
        if (!token) {
            next()
        } else {
            return res.redirect('/')
        }
    } catch (e) {
        console.log(e)
        return res.status(403).json({ message: 'вы не авторизованы' })
    }
};