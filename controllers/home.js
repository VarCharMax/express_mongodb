import BlogPost from '../models/BlogPost.js';

const homeController = async (req, res) => {
  const blogposts = await BlogPost.find({});
  res.render('index', { blogposts });
};

export default homeController;
