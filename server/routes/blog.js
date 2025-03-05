const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth'); // Import the authentication middleware
const { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } = require('../controllers/blog');
const mongoose = require('mongoose');
const Bookmark = require('../models/bookmarks');


// Route to create a new blog post with image upload
router.post('/', auth, upload.single('image'), createBlog);

// Route to get all blog posts
router.get('/', getAllBlogs);

// Bookmark Routes - MUST come before parameterized routes
// Add bookmark
router.post('/bookmarks/add', auth, async (req, res) => {
    console.log('Add bookmark route hit');
    console.log('Request body:', req.body);
    console.log('User:', req.user);
    
    try {
        const username = req.user.username;
        const { blogId } = req.body;

        console.log('Looking for blog with ID:', blogId);
        // Verify blog exists
        const blog = await Blog.findById(blogId);
        if (!blog) {
            console.log('Blog not found');
            return res.status(404).json({ message: 'Blog not found' });
        }
        console.log('Blog found:', blog);

        // Find or create bookmark document
        let bookmark = await Bookmark.findOne({ username });
        console.log('Existing bookmark:', bookmark);
        
        if (!bookmark) {
            console.log('Creating new bookmark document for user:', username);
            bookmark = new Bookmark({ username, bookIds: [] });
        }

        // Check if blog is already bookmarked
        if (!bookmark.bookIds.includes(blogId)) {
            console.log('Adding blog to bookmarks');
            bookmark.bookIds.push(blogId);
            await bookmark.save();
            console.log('Bookmark saved successfully');
        } else {
            console.log('Blog already bookmarked');
        }

        res.status(200).json({ message: 'Blog added to bookmarks', bookmark });
    } catch (error) {
        console.error('Error adding bookmark:', error);
        res.status(500).json({ error: 'Error adding blog to bookmarks' });
    }
});

// Remove bookmark
router.delete('/bookmarks/remove', auth, async (req, res) => {
    try {
        const username = req.user.username;
        const { blogId } = req.body;

        // Find bookmark document
        const bookmark = await Bookmark.findOne({ username });
        if (!bookmark) {
            return res.status(404).json({ message: 'No bookmarks found for this user' });
        }

        // Remove blog from bookmarks
        bookmark.bookIds = bookmark.bookIds.filter(id => id.toString() !== blogId);
        await bookmark.save();

        res.status(200).json({ message: 'Blog removed from bookmarks', bookmark });
    } catch (error) {
        console.error('Error removing bookmark:', error);
        res.status(500).json({ error: 'Error removing blog from bookmarks' });
    }
});

// Middleware to fetch bookIds for logged in user
const fetchBookIds = async (req, res, next) => {
    try {
        const username = req.user.username;
        console.log('Fetching bookIds for user:', username);

        const bookmarkDoc = await Bookmark.findOne({ username });
        console.log('Found bookmark document:', bookmarkDoc);

        if (!bookmarkDoc || !bookmarkDoc.bookIds) {
            req.bookIds = [];
        } else {
            req.bookIds = bookmarkDoc.bookIds;
        }
        console.log('Found bookIds:', req.bookIds);
        next();
    } catch (error) {
        console.error('Error in fetchBookIds middleware:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error fetching bookmark IDs',
            details: error.message
        });
    }
};

// Step 1: Get bookmarked blog IDs for the user
router.get('/bookmarks/ids', auth, fetchBookIds, (req, res) => {
    try {
        console.log('Sending bookIds to client:', req.bookIds);
        res.status(200).json({
            success: true,
            bookIds: req.bookIds || []
        });
    } catch (error) {
        console.error('Error sending bookmark IDs:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error retrieving bookmark IDs',
            details: error.message
        });
    }
});

// Step 2: Get blog details by ID
router.get('/bookmarks/blog/:id', auth, async (req, res) => {
    try {
        const blogId = req.params.id;
        console.log('Fetching blog details for ID:', blogId);

        const blog = await Blog.findById(blogId);
        if (!blog) {
            console.log('Blog not found for ID:', blogId);
            return res.status(404).json({
                success: false,
                error: 'Blog not found'
            });
        }

        console.log('Found blog:', blog.title);
        res.status(200).json({
            success: true,
            blog
        });
    } catch (error) {
        console.error('Error fetching blog details:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error retrieving blog details',
            details: error.message
        });
    }
});

// Route to get blogs by username (createdBy)
router.get('/by-user/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const blogs = await Blog.find({ createdBy: username }).sort({ createdAt: -1 });
        if (!blogs.length) {
            return res.status(404).json({ message: `No blogs found for user: ${username}` });
        }
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error fetching blogs by username:', error.message);
        res.status(500).json({ message: 'Server error occurred while fetching blogs' });
    }
});

// Comments routes
router.post('/:id/comments', auth, async (req, res) => {
    const { content } = req.body;
    const { id } = req.params;
  
    if (!content) {
      console.error('Missing content in request body');
      return res.status(400).json({ error: 'Comment content is required.' });
    }
  
    try {
      console.log('Validating blog ID:', id);
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid blog ID.' });
      }
  
      console.log('Checking if blog exists...');
      const blog = await Blog.findById(id);
      if (!blog) {
        console.error('Blog not found for ID:', id);
        return res.status(404).json({ error: 'Blog not found.' });
      }
  
      console.log('Creating new comment...');
      const comment = new Comment({
        content,
        blogId: id,
        username: req.user.username,
      });
  
      console.log('Saving comment:', comment);
      await comment.save();
  
      console.log('Comment saved successfully:', comment);
      res.status(201).json(comment);
    } catch (error) {
      console.error('Error occurred:', error.message, error.stack);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  
  router.get('/:id/comments', async (req, res) => {
    try {
      const blogId = req.params.id;
      // Find all comments for the specific blogId and sort them by createdAt (newest first)
      const comments = await Comment.find({ blogId }).sort({ createdAt: -1 });
      res.json(comments);  // Send back the comments
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching comments' });
    }
  });
  
  
  router.get('/me', auth, (req, res) => {
    try {
      if (!req.user || !req.user.username) {
        return res.status(404).json({ error: 'User information not found' });
      }
  
      res.status(200).json({ username: req.user.username });
    } catch (error) {
      console.error('Error fetching user info:', error.message);
      res.status(500).json({ error: 'Server error occurred while fetching user info' });
    }
  });

// Route to get a single blog post by ID
router.get('/:id', getBlogById);

// Route to update a blog post by ID
router.put('/:id', auth, updateBlog);

// Route to delete a blog post by ID
router.delete('/:id', auth, deleteBlog);

module.exports = router;