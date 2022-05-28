// Import
const req = require('express/lib/request')
const mongoose = require('mongoose'),
    express = require('express'),
    session = require('express-session'),
    morgan = require('morgan'),
    Msg = require('./app/models/message')
const { Socket } = require('socket.io')
flash = require('express-flash'),
    cookieParser = require('cookie-parser'),
    { createPath } = require('./core/lib/UIpath')



// setings ui
const app = express()
app.set('view engine', 'ejs')



// config
const Hostname = '127.0.0.1'
const Port = 80


//import routs
const postRouts = require('./core/routs/post-rout'),
    staticRouts = require('./core/routs/static-rout'),
    adminRouts = require('./core/routs/admin-rout'),
    userRouts = require('./core/routs/user-rout'),
    apiRouts = require('./app/api/Users-setings.js')
//apiMail = require('./app/api/apiMail')


// db
const db = 'mongodb://root-admin:no8sU6caURKi@localhost:27017/?authMechanism=DEFAULT&authSource=medweb-node'
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('Connect to MongoDB'))
    .catch((error) => console.log(error))

// lib
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}))
app.use(cookieParser())
app.use(flash())


// socket io
const http = require('http').createServer(app)
const io = require('socket.io')(http)



io.on('connection', (socket) => {
    console.log('User connection');
    socket.emit('message');
    socket.on('disconect', () => {
        console.log('Usesr Disconect');
    })
    socket.on('chatmessage', (data) => {

        const message = new Msg(data)
        message.save().then(() => {
            io.emit('chatmessage', { msg: data.msg })
        })

    })


});



// Initialization server and socet-io
http.listen(Port, Hostname, (error) => {
    error ? console.log(error) : console.log(`listening port: 127.0.0.1:${Port}`);
});


//include static css,js.etc
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))





// routs
app.use(staticRouts);
app.use(postRouts);
app.use(adminRouts);
app.use(userRouts);
app.use(apiRouts);
//sapp.use(apiMail);


//404 error
app.use((req, res) => {
    const title = 'ERROR 404...';
    res
        .status(404)
        .render(createPath('errors'), { title });
});