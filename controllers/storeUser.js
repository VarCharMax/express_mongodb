import User from '../models/User.js';

const storeUserController = async (req, res) => {
  await User.create({ ...req.body })
    .then((user) => {
      res.redirect('/');
    })
    .catch((error) => {
      const validationErrors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );
      req.flash('validationErrors', validationErrors);
      // req.session.validationErrors = validationErrors;
      res.redirect('/auth/register');
    });
};

export default storeUserController;
