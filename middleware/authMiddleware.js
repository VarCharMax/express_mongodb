import User from '../models/User.js';

const authMiddleware = (req, res, next) => {
  User.findById(req.session.userId)
    .then((userFound) => {
      if (!userFound) {
        return res.redirect('/auth/login');
      }
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};

export default authMiddleware;
