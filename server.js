// Import
const mongoose = require('mongoose'),
    express = require('express'),
    morgan = require('morgan'),
    passport = require('passport'),
    { createPath } = require('./core/lib/UIpath')


// setings ui
const app = express()
app.set('view engine', 'ejs')


// config
const Hostname = '127.0.0.1'
const Port = 3000


//import routs
const postRouts = require('./core/routs/post-rout'),
    staticRouts = require('./core/routs/static-rout'),
    adminRouts = require('./core/routs/admin-rout'),
    userRouts = require('./core/routs/user-rout')



// db
const db = 'mongodb://root-admin:no8sU6caURKi@localhost:27017/?authMechanism=DEFAULT&authSource=medweb-node'
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('Connect to MongoDB'))
    .catch((error) => console.log(error))



// lib
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.urlencoded({ extended: false }))


// socket io
const http = require('http').createServer(app)
app.use(express.json())
const io = require('socket.io')(http)


app.use(passport.initialize())
require('./app/middleware/passport')(passport)




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


//404 error
app.use((req, res) => {
    const title = 'ERROR 404...';
    res
        .status(404)
        .render(createPath('errors'), { title });
});