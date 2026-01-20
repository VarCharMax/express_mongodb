import BlogPost from '../models/BlogPost.js';

const getPostController = async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id);
  res.render('post', { blogpost });
};

export default getPostController;
