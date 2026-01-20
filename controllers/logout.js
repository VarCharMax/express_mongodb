const logoutController = async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

export default logoutController;
