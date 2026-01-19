import express, { json, urlencoded } from 'express';

import BlogPost from './models/BlogPost.js';
import { connect } from 'mongoose';

const app = new express();

connect('mongodb://localhost:27017/my_database');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(json());
app.use(urlencoded({ extended: true }));

app.listen(4000, () => {
  console.log('App listening on port 4000');
});

app.get('/', async (req, res) => {
  const blogposts = await BlogPost.find({
    // title: /science/,
  });
  console.log(blogposts);
  res.render('index', { blogposts });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/post/:id', async (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'pages/post.html'));
  const blogpost = await BlogPost.findById(req.params.id);
  res.render('post', { blogpost });
});

app.get('/posts/new', (req, res) => {
  res.render('create');
});

app.post('/posts/store', async (req, res) => {
  await BlogPost.create(req.body)
    .then((blogpost) => {
      res.redirect('/');
    })
    .catch((err) => {
      console.error(err);
    });
});
