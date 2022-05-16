// Import
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { title } = require('process');
const app = express()

//template
app.set('view engine', 'ejs')

// Const
const Port = 3000


app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false }));

// start server
app.listen(Port, (error) => {
    error ? console.log(error) : console.log(`listening port ${Port}`);
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
    const post = {
      id: new Date(),
      date: (new Date()).toLocaleDateString(),
      img,
      title,
      author,
      description,
    };
    res.render(createPath('post'), { post, title });
  });

app.get('/add-post', (req, res) => {
    const title = 'Добавить пост' ;
    res.render(createPath('add-post'), {title});
})

app.get('/posts', (req, res) => {
    const title = 'Новости';
    const posts = [{
        id: '1',
        img: 'https://dummyimage.com/750x400/fff/000.png',
        title: 'Заголовок',
        author: 'Анатолий Ляхов',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
    }];
    res.render(createPath('posts'), { posts, title });
})

app.get('/posts/:id', (req, res) => {
    const post = {
        id: '1',
        img: 'https://st.depositphotos.com/2065849/2868/i/600/depositphotos_28686673-stock-photo-in-a-modern-clinic-abstract.jpg',
        title: 'Заголовок.',
        author: 'Анатолий Ляхов',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
    };
    res.render(createPath('post'), { post });
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