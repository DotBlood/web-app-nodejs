const bcrypt = require('bcryptjs'),
    User = require('../models/user')
const jwt = require('jsonwebtoken')

/*
 * Регистрция пользывателя
 * происходит это просто, мы получаем данные из форм с сайта и проверяем их на волидносит.
 * Если данные пршли все проверки, то мы создаем новую аргумент в базе данных
 */

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
        }
    }
}

/*
 * Генератор токина, 
 * сюда мы передаем данные которые будет хронить токен, так же секретный код, 
 * через который эти дланные сможет читать сервер, вообще лучше хронить данный ключ в отдельно файле, что бы первое нигде не ошибиться, 
 * а так же чтобы в случае чего взлоумышлиники не смогли изиминить свои данные
 */

const generateAccessToken = (UserId, Username, roles) => {
    const payload = {
        UserId,
        username,
        roles,
    }
    return jwt.sign(payload, 'test', { expiresIn: '1d' })
}

/*
 * Авторизация пользывателя
 * Для авторизации я выбрал jwt формат, (JSON Web Token (JWT) — это JSON объект, который определен в открытом стандарте RFC 7519. 
 * Он считается одним из безопасных способов передачи информации между двумя участниками. Для его создания необходимо определить заголовок (header)
 * с общей информацией по токену, полезные данные (payload), такие как id пользователя, его роль и т.д. и подписи (signature).
 * Кстати, правильно JWT произносится как /джет/)
 * Даные с формы так же проходят волидацию после чего все данные проверяются в базе данных, если данные совпали и человек был найден в moongodb
 * Создаеться jwt токен, который передается в cookie под названием token
 * одна такая сессия длиться 1 день, через день человеку придеться заного авторизироваться на сайте
 */
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

            const token = generateAccessToken(user._id, user.username, user.roles)

            res.set("Set-Cookie", `Token=Barer ${token}; Path=/; HttpOnly`)

            res.redirect('/user/login')

        } else {
            res.status(401).json({ message: 'Не верный пароль' })

        }
    } else {

        res.status(404).json({ message: 'пользывателя с такии username не существует' })
    }
}


module.exports = { Register, Login }