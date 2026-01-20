import express, { json, urlencoded } from 'express';

import fileUpload from 'express-fileupload';
import getPostController from './controllers/getPost.js';
import homeController from './controllers/home.js';
import mongoose from 'mongoose';
import newPostController from './controllers/newpost.js';
import storePostController from './controllers/storePost.js';
import validateMiddleWare from './middleware/validationMiddleware.js';

mongoose.connect('mongodb://localhost:27017/my_database');

const app = new express();

const customMiddleWare = (req, res, next) => {
  console.log('Custom middleware called');
  next();
};

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(fileUpload());
// app.use(customMiddleWare);
app.use('/posts/store', validateMiddleWare);

app.listen(4000, () => {
  console.log('App listening on port 4000');
});

app.get('/', homeController);
app.get('/post/:id', getPostController);
app.get('/posts/new', newPostController);
app.post('/posts/store', storePostController);
