const express = require('express'),
    nodemailer = require('nodemailer'),
    router = express.Router();



router.post('/api/que', (req, res) => {
    const { sendto, username, description } = req.body

    if (!sendto || !username || !description) {
        res.cookie('error', 'Заполнины не все поля', { expires: new Date(Date.now() + 1000), httpOnly: false })
        return res.status(400).redirect('/questions')
    }

    const Transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        host: '465',
        service: 'gmail',
        auth: {
            user: 'mailwebmedsupp@gmail.com',
            pass: 'CefN8~{k#jlV'
        }


    })
    const mailOpt = {
        from: 'mailwebmedsupp@gmail.com',
        to: 'mailwebmedsupp@gmail.com',
        subject: `${username}: Оставил(а) комментарий!`,
        text: `Почта человека: ${sendto} <br> ${description}`
    }

    try {
        Transport.sendMail(mailOpt)
        res.redirect('/')
    } catch (e) {
        console.log(e)
        res.redirect('/')
    }
})

module.exports = router;