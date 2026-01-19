import { Schema, model } from 'mongoose';

const BlogPostSchema = new Schema({
  title: String,
  body: String,
  username: String,
  datePosted: {
    /* can declare property type with an object like this because we need 'default' */
    type: Date,
    default: new Date(),
  },
});

const BlogPost = model('BlogPost', BlogPostSchema);
export default BlogPost;
