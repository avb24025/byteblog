const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  bookIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }],
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);
