const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { createPathAdmin } = require('../../core/lib/UIpath');
const User = require('../models/user');
const config = require('../../core/config');


async function Register(req, res) {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password


    if (!username || !email || !password) {
        return res
            .status(400)
            .json({ message: 'Username, email and password must be provided' })
    }

    const canditate = await User.findOne({ username: req.body.username })

    if (canditate) {
        res.status(409).send('~login');
    } else {

        const canditate = await User.findOne({ email: req.body.email })

        if (canditate) {
            res.status(409).send('~email');
        } else {

            const salt = bcrypt.genSaltSync(10);

            const user = new User({
                email: email,
                username: username,
                password: bcrypt.hashSync(password, salt)
            })

            try {
                await user.save()
                res.status(201).redirect('/')
            } catch (e) {
                console.log(e);
            }
        }
    }
}


async function Login(req, res) {
    const condidate = await User.findOne({ email: req.body.email })

    if (condidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, condidate.password)
        if (passwordResult) {

            const token = jwt.sign({
                role: condidate.role,
                username: condidate.username,
                userId: condidate._id,

            }, config.jwt, { expiresIn: 60 * 60 });

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({ message: 'Не верный пароль' })
        }
    } else {
        res.status(404).json({ message: 'пользывателя с такии email не существует' })
    }




}

const getUsers = (req, res) => {
    //
}

module.exports = {
    Register,
    Login,
    getUsers
};