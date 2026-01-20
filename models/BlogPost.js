import { Schema, mongoose } from 'mongoose';

const BlogPostSchema = new Schema({
  title: String,
  body: String,
  username: String,
  datePosted: {
    /* can declare property type with an object like this because we need 'default' */
    type: Date,
    default: new Date(),
  },
  image: String,
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
export default BlogPost;
