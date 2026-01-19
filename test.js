const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost').default;

mongoose.connect('mongodb://localhost/my_database');
BlogPost.create({
  title:
    'The Guardian view on microplastics research: questioning results is good for science, but has political consequences',
  body: 'It is true that science is self-correcting. Over the long term this means that we can generally trust its results – but up close, correction can be a messy process. The Guardian reported last week that 20 recent studies measuring the amount of micro- and nanoplastics in the human body have been criticised in the scientific literature for methodological issues, calling their results into question. In one sense this is the usual process playing out as it should. However, the scale of the potential error – one scientist estimates that half the high-impact papers in the field are affected – suggests a systemic problem that should have been prevented.',
})
  .then((blogpost) => {
    console.log(blogpost);
  })
  .catch((err) => {
    console.error(err);
  });
