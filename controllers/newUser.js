const newUserController = async (req, res) => {
  res.render('register', {
    errors: req.session.validationErrors || [],
  });
};

export default newUserController;
