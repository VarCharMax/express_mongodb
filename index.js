import express, { json, urlencoded } from 'express';

import BlogPost from './models/BlogPost.js';
import { connect } from 'mongoose';
import { fileURLToPath } from 'url';
import fileUpload from 'express-fileupload';
import path from 'path';

const app = new express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connect('mongodb://localhost:27017/my_database');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(fileUpload());

app.listen(4000, () => {
  console.log('App listening on port 4000');
});

app.get('/', async (req, res) => {
  const blogposts = await BlogPost.find({
    // title: /science/,
  });
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
  let image = req.files.image;
  image.mv(path.resolve(__dirname, 'public/img', image.name), async (error) => {
    await BlogPost.create({ ...req.body, image: '/img/' + image.name })
      .then((blogpost) => {
        res.redirect('/');
      })
      .catch((err) => {
        console.error(err);
      });
  });
});
