const newUserController = async (req, res) => {
  res.render('register', {
    errors: req.flash('validationErrors') || [],
  });
};

export default newUserController;
