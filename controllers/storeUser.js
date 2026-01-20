import User from '../models/User';

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
