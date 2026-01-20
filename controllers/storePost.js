import BlogPost from '../models/BlogPost.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storePostController = async (req, res) => {
  let image = req.files.image;
  image.mv(path.resolve(__dirname, './public/img/' + image.name), async (error) => {
    await BlogPost.create({ ...req.body, image: '/img/' + image.name })
      .then((blogpost) => {
        res.redirect('/');
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

export default storePostController;
