const bcrypt = require('bcryptjs'),
    User = require('../models/user'),
    jwt = require('jsonwebtoken'),
    express = require('express')

const router = express.Router();



router.post('/api', (req, res) => {
    res.redirect('/')
});


router.post('/api/editUsername', async (req, res) => {
    const { username } = req.body

    if (!{ username }) {
        res.cookie('error', 'Поле username не заполнено!', { expires: new Date(Date.now() + 1000), httpOnly: false })
        return res.status(400).redirect('/user/page')
    }

    try {
        const token = req.cookies['Token']
        if (token) {
            try {
                const decoded = jwt.verify(token, 'test')
                const UserId = decoded.UserId

                try {
                    const EditUsername = await User.findByIdAndUpdate(UserId, { username }, { new: true })
                }
                catch (e) {
                    console.log(e)
                }
                res.cookie('success', `Вы успешно изенили usename на: ${username}`, { expires: new Date(Date.now() + 1000), httpOnly: false })
                res.redirect('/user/page')
            }
            catch (e) {
                res.cookie('error', 'Похже что-то пошло не по плану :/', { expires: new Date(Date.now() + 1000), httpOnly: false })
                res.cookie('Token', '', { expires: new Date(Date.now() + 0), path: '/', httpOnly: true })
                console.log(e)
                return res.status(400).redirect('/user/login')
            }
        }
    }
    catch (e) {
        res.cookie('error', 'Вам сюда нельзя!', { expires: new Date(Date.now() + 1000), httpOnly: false })
        return res.status(400).redirect('/')
    }
});

router.post('/api/editPassword', async (req, res) => {
    const { passwordOld, passwordNew } = req.body

    if (!{ passwordOld } || !{ passwordNew }) {
        res.cookie('error', 'Вы заполнили не все поля!', { expires: new Date(Date.now() + 1000), httpOnly: false })
        return res.status(400).redirect('/user/page')
    }

    try {
        const token = req.cookies['Token']
        if (token) {
            try {
                const decoded = jwt.verify(token, 'test')

                const UserId = decoded.UserId
                try {
                    const user = await User.findById(UserId)

                    const passwordResult = await bcrypt.compareSync(req.body.passwordOld, user.password);

                    if (passwordResult) {
                        const salt = await bcrypt.genSaltSync(10);
                        password = await bcrypt.hashSync(passwordNew, salt)
                        await User.findByIdAndUpdate(UserId, { password: password })
                        res.cookie('success', `Вы успешно изменили свой пароль :)`, { expires: new Date(Date.now() + 1000), httpOnly: false })
                        res.redirect('/user/page')
                    }
                    else {
                        res.cookie('error', 'Похже что-то пошло не по плану :/', { expires: new Date(Date.now() + 1000), httpOnly: false })
                        res.redirect('/user/page')
                    }
                }
                catch (e) {
                    console.log(e)
                }
            }
            catch (e) {
                res.cookie('error', 'Похoже что-то пошло не по плану :/', { expires: new Date(Date.now() + 1000), httpOnly: false })
                //res.cookie('Token', '', { expires: new Date(Date.now() + 0), path: '/', httpOnly: true })
                console.log(e)
                return res.status(400).redirect('/user/page')
            }
        }
    }
    catch (e) {
        res.cookie('error', 'Вам сюда нельзя!', { expires: new Date(Date.now() + 1000), httpOnly: false })
        return res.status(400).redirect('/')
    }

});

router.get('/api/logout', async (req, res) => {
    res.cookie('Token', '', { expires: new Date(Date.now() + 0), path: '/', httpOnly: true })
    res.redirect('/')
})




module.exports = router