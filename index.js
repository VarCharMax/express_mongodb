import express, { json, urlencoded } from 'express';

import flash from 'connect-flash';
import fileUpload from 'express-fileupload';
import expressSession from 'express-session';
import mongoose from 'mongoose';
import getPostController from './controllers/getPost.js';
import homeController from './controllers/home.js';
import loginController from './controllers/login.js';
import loginUserController from './controllers/loginUser.js';
import logoutController from './controllers/logout.js';
import newPostController from './controllers/newpost.js';
import newUserController from './controllers/newUser.js';
import storePostController from './controllers/storePost.js';
import storeUserController from './controllers/storeUser.js';
import authMiddleware from './middleware/authMiddleware.js';
import redirectIfAuthenticatedMiddleware from './middleware/redirectIfAuthenticatedMiddleware.js';
import validateMiddleWare from './middleware/validationMiddleware.js';

// mongoose.connect('mongodb://localhost:27017/my_database');
mongoose.connect(
  'mongodb+srv://rparkes_db_user:LTeoZMwiCBGnedyj>@cluster0.sr3rl47.mongodb.net/blog'
);

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
app.use(flash());
app.use('/posts/store', validateMiddleWare);
app.all('/{*splat}', (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

let port = process.env.PORT;

if (port == null || port == '') {
  port = 4000;
}
app.listen(port, () => {
  console.log('App listening...');
});

app.get('/', homeController);
app.get('/post/:id', getPostController);
app.get('/posts/new', authMiddleware, newPostController);
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.get('/auth/logout', authMiddleware, logoutController);
app.post('/posts/store', authMiddleware, storePostController);
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);
app.use((req, res) => {
  res.status(404).render('notfound');
});
