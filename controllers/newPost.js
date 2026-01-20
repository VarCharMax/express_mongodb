const newPostController = (req, res) => {
  if (req.session.userId) {
    return res.render('create', { createPost: true });
  }
  res.redirect('/auth/login');
};
export default newPostController;
