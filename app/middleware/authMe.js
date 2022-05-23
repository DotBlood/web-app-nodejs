const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") { next() }
    try {
        const token = req.cookies['Token']
        if (!token) {
            return res.status(403).json({ message: 'вы не авторизованы' })
        } else {
            const decodeData = jwt.verify(token, 'test')
            req.user = decodeData
            next()
        }
    } catch (e) {
        console.log(e)
        return res.status(403).json({ message: 'вы не авторизованы' })
    }
};