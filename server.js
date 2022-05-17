// Import
const mongoose = require('mongoose')
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const Post = require('./app/models/post');







//template
const app = express();
app.set('view engine', 'ejs')

// Const
const Hostname = '127.0.0.1'
const Port = 3000




// db
const db = 'mongodb://root-admin:no8sU6caURKi@localhost:27017/?authMechanism=DEFAULT&authSource=medweb-node';
mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true} )
    .then((res) => console.log('Connect to MongoDB'))
    .catch((error) => console.log(error));




//lib
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false }));



// start server
app.listen(Port, Hostname, (error) => {
    error ? console.log(error) : console.log(`listening port: 127.0.0.1:${Port}`);
});

// include views
const createPath = (page) => path.resolve(__dirname, 'views', `${page}.ejs`);

//include static css,js.etc
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'image/png'))



// routs
app.get('/', (req, res) => {
    const title = 'Дабро пожалывать!';
    res.render(createPath('index'), {title});
})

app.get('/about-us', (req, res) => {
    const title = 'Немного о нас';
    res.render(createPath('about-us'), {title});
})

app.get('/services', (req, res) => {
    const title = 'Наши услуги';
    res.render(createPath('services'), {title});
})

app.post('/add-post', (req, res) => {
    const { title, author, description, img } = req.body;
    const post = new Post({title, author, description, img})
    post
        .save()
        .then((result) => res.redirect('posts'))
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), {title: 'error'})
        })
  });

app.get('/add-post', (req, res) => {
    const title = 'Добавить пост' ;
    res.render(createPath('add-post'), {title});
});

app.get('/posts', (req, res) => {
    const title = 'Новости';
    Post
        .find()
        .sort( {createdAt: -1})
        .then((posts) => res.render(createPath('posts'), { posts, title }))
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), {title: 'error'})
        }) 
});

app.get('/posts/:id', (req, res) => {
    Post
    .findById(req.params.id)
    .then((post) => res.render(createPath('post'), { post }))
    .catch((error) => {
        console.log(error);
        res.render(createPath('errors'), {title: 'Error'})
    }) 


})

app.get('/questions', (req, res) => {
    const title = 'Задайте нам свой вопрос';
    res.render(createPath('questions'), { title });
})

app.use((req, res) => {
    const title = 'ERROR 404...';
    res
        .status(404)
        .render(createPath('errors'), {title});
})