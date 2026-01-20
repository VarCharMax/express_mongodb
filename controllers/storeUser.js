import User from '../models/User.js';

const storeUserController = async (req, res) => {
  await User.create({ ...req.body })
    .then((user) => {
      res.redirect('/');
    })
    .catch((error) => {
      console.log(error);
    });
};

export default storeUserController;
