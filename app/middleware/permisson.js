/* Проверка по jwt роль человек
 * TODO:
 * добавить сравнение с ролью в бд 
 */

const jwt = require('jsonwebtoken')

module.exports = function (Roles) {
    return async function (req, res, next) {
        if (req.method === "OPTIONS") { next() }

        try {
            const token = req.cookies['Token']
            if (token) {
                try {
                    const decoded = jwt.verify(token, 'test')
                    if (decoded.Roles == Roles) {
                        next()
                    } else {
                        res.cookie('error', 'Вам сюда нельзя!', { expires: new Date(Date.now() + 1000), httpOnly: false })
                        return res.status(400).redirect('/')
                    }
                } catch (e) {
                    res.cookie('error', 'Ваши данные устарели!', { expires: new Date(Date.now() + 1000), httpOnly: false })
                    res.cookie('Token', '', { expires: new Date(Date.now() + 0), path: '/', httpOnly: true })
                    return res.status(400).redirect('/')
                }
            }
        } catch (e) {
            res.cookie('error', 'Вам сюда нельзя!', { expires: new Date(Date.now() + 1000), httpOnly: false })
            return res.status(400).redirect('/')
        }
    }
}