const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") { next() }
    try {
        const token = req.cookies['Token']
        if (!token) {
            res.cookie('error', 'Вы не авторизованы!', { expires: new Date(Date.now() + 1000), httpOnly: false })
            return res.status(400).redirect('/user/login')
        } else {
            try {
                const decodeData = jwt.verify(token, 'test')
                req.user = decodeData
                next()
            } catch (e) {
                console.log(e)
                res.cookie('error', 'Вам нужно авторизоваться заного!', { expires: new Date(Date.now() + 1000), httpOnly: false })
                res.cookie('Token', '', { expires: new Date(Date.now() + 0), path: '/', httpOnly: true })
                return res.status(400).redirect('/user/login')
            }

        }
    } catch (e) {
        console.log(e)
        res.cookie('error', 'Вы не авторизованы!', { expires: new Date(Date.now() + 1000), httpOnly: false })
        return res.status(400).redirect('/user/login')

    }
};