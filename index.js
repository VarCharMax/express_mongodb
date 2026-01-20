import express, { json, urlencoded } from 'express';

import authMiddleware from './middleware/authMiddleware.js';
import expressSession from 'express-session';
import fileUpload from 'express-fileupload';
import getPostController from './controllers/getPost.js';
import homeController from './controllers/home.js';
import loginController from './controllers/login.js';
import loginUserController from './controllers/loginUser.js';
import mongoose from 'mongoose';
import newPostController from './controllers/newpost.js';
import newUserController from './controllers/newUser.js';
import redirectIfAuthenticatedMiddleware from './middleware/redirectIfAuthenticatedMiddleware.js';
import storePostController from './controllers/storePost.js';
import storeUserController from './controllers/storeUser.js';
import validateMiddleWare from './middleware/validationMiddleware.js';

mongoose.connect('mongodb://localhost:27017/my_database');

const app = new express();

global.loggedIn = null;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(fileUpload());
app.use(
  expressSession({
    secret: 'keyboard cat',
  })
);
app.use('/posts/store', validateMiddleWare);
app.all('/{*splat}', (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

app.listen(4000, () => {
  console.log('App listening on port 4000');
});

app.get('/', homeController);
app.get('/post/:id', getPostController);
app.get('/posts/new', authMiddleware, newPostController);
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.post('/posts/store', authMiddleware, storePostController);
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);
