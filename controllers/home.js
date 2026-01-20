import BlogPost from '../models/BlogPost.js';

const homeController = async (req, res) => {
  const blogposts = await BlogPost.find({}).populate('userid');
  res.render('index', { blogposts });
};

export default homeController;
