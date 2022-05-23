const bcrypt = require('bcryptjs'),
    User = require('../models/user')
    


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

            const salt = await bcrypt.genSaltSync(10);

            const user = new User({
                email: email,
                username: username,
                password: await bcrypt.hashSync(password, salt)
            })

            try {
                await user.save()
                res.redirect('/user/login')
            } catch (e) {
                console.log(e);
            }
            try { await createsessions } catch (e) { console.log(e) }
            res.status(201).redirect('/user')
        }
    }
}

const generateAccessToken = (id, username, role) => {
    const payload = {
        id,
        username,
        role,
    }
    return jwt.sign(payload, 'test', { expiresIn: '15m' })
}


async function Login(req, res) {

    if (!req.body.username || !req.body.password) {
        return res
            .status(400)
            .json({ message: 'Username, email and password must be provided' })
    }

    const user = await User.findOne({ username: req.body.username })

    if (user) {
        const passwordResult = bcrypt.compareSync(req.body.password, user.password);

        if (passwordResult) {

            const token = generateAccessToken(user._id, user.username, user.role)

            localStorage.setItem('token', token);


            var cookieExtractor = function (req) {
                var token = null;
                if (req && req.cookies) {
                    token = req.cookies['jwt'];
                }
                return token;
            };
            opts.jwtFromRequest = cookieExtractor;



        } else {
            res.status(401).json({ message: 'Не верный пароль' })

        }
    } else {

        res.status(404).json({ message: 'пользывателя с такии username не существует' })
    }
}



module.exports = { Register, Login }