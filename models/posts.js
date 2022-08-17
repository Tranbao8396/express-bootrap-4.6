var mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;