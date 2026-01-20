import User from '../models/User.js';
import bcrypt from 'bcrypt';

const loginUserController = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            res.redirect('/');
          } else {
            res.redirect('/auth/login');
          }
        });
      } else {
        res.redirect('/auth/login');
      }
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/auth/login');
    });
};

export default loginUserController;
