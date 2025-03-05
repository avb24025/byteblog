import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import fetchUsername from './fetchUsername';
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Edit2, Trash2, Send, User } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(true);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [username, setUsername] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // Check authentication status and fetch username
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    
    const initialize = async () => {
      try {
        const loggedInUsername = await fetchUsername();
        setUsername(loggedInUsername);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    if (token) {
      initialize();
    }
  }, []);

  // Fetch blog and comments data
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const blogResponse = await axios.get(`http://127.0.0.1:3000/api/blogs/${id}`);
        setBlog(blogResponse.data);

        const commentsResponse = await axios.get(`http://127.0.0.1:3000/api/blogs/${id}/comments`);
        setComments(commentsResponse.data || []);
      } catch (error) {
        console.error('Error fetching blog or comments:', error);
        setError('Failed to load blog post');
      }
    };

    fetchBlogData();
  }, [id]);

  // Check bookmark status
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (!isAuthenticated) {
        setIsBookmarked(false);
        return;
      }

      try {
        console.log('Checking bookmark status...');
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:3000/api/blogs/bookmarks/ids', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Bookmark status response:', response.data);
        if (response.data.success && response.data.bookIds) {
          const isCurrentBlogBookmarked = response.data.bookIds.includes(id);
          console.log('Is current blog bookmarked:', isCurrentBlogBookmarked);
          setIsBookmarked(isCurrentBlogBookmarked);
        } else {
          setIsBookmarked(false);
        }
      } catch (error) {
        console.error('Error checking bookmark status:', error);
        setIsBookmarked(false);
      }
    };

    checkBookmarkStatus();
  }, [isAuthenticated, id]);

  // Handle bookmark click
  const handleBookmarkClick = async () => {
    if (!isAuthenticated) {
      setShowLoginAlert(true);
      return;
    }

    try {
      console.log('Toggling bookmark...');
      const token = localStorage.getItem('token');
      const method = isBookmarked ? 'DELETE' : 'POST';
      const endpoint = isBookmarked ? '/bookmarks/remove' : '/bookmarks/add';
      
      console.log('Making request:', {
        method,
        url: `http://127.0.0.1:3000/api/blogs${endpoint}`,
        blogId: id
      });

      const response = await axios({
        method,
        url: `http://127.0.0.1:3000/api/blogs${endpoint}`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: { blogId: id }
      });

      console.log('Toggle response:', response.data);
      
      // Verify the bookmark status after toggling
      const checkResponse = await axios.get('http://127.0.0.1:3000/api/blogs/bookmarks/ids', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (checkResponse.data.success) {
        const newBookmarkStatus = checkResponse.data.bookIds.includes(id);
        setIsBookmarked(newBookmarkStatus);
        toast.success(newBookmarkStatus ? 'Added to bookmarks' : 'Removed from bookmarks');
      } else {
        throw new Error('Failed to verify bookmark status');
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      toast.error('Failed to update bookmark');
    }
  };

  // Delete blog
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`http://127.0.0.1:3000/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Blog deleted successfully');
        navigate('/home');
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  // Post new comment
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setShowLoginAlert(true);
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:3000/api/blogs/${id}/comments`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments((prev) => [...prev, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-[#0a0a0a] flex justify-center items-center">
        <div className="bg-gradient-to-br from-gray-900/50 to-black/50 p-8 rounded-2xl border border-gray-800/50 backdrop-blur-xl text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:shadow-lg hover:shadow-cyan-500/20 transition-all mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </motion.button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-[#0a0a0a] flex justify-center items-center">
        <div className="w-16 h-16 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 animate-spin" />
      </div>
    );
  }

  const isOwner = blog.createdBy === username;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#0a0a0a] font-playfair pt-24">
      {/* Login Alert */}
      {showLoginAlert && (
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md mx-auto"
        >
          <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 backdrop-blur-xl border border-amber-500/30 text-white p-4 rounded-xl shadow-lg">
            <div className="flex items-center justify-between gap-4">
              <span className="text-amber-200">Please log in first to perform this action.</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowLoginAlert(false)}
                  className="px-3 py-1 rounded-lg bg-black/50 hover:bg-black/70 transition-colors text-sm"
                >
                  Dismiss
                </button>
                <button 
                  onClick={() => navigate('/login')}
                  className="px-3 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 transition-colors text-sm"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden mb-8 group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
          <img
            src={`http://127.0.0.1:3000/${blog.imageUrl?.replace(/\\/g, '/')}`}
            alt={blog.title}
            className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 to-cyan-600 bg-clip-text text-transparent">
              {blog.title}
            </h1>
            <motion.button 
              onClick={handleBookmarkClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`text-2xl ${isBookmarked ? 'text-cyan-500' : 'text-gray-400 hover:text-cyan-500'} transition-colors`}
            >
              {isBookmarked ? <IoBookmark className="transition-transform transform hover:scale-110" /> : <IoBookmarkOutline className="transition-transform transform hover:scale-110" />}
            </motion.button>
          </div>

          <div className="flex items-center gap-4 text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <User className="w-4 h-4 text-cyan-400" />
              </div>
              <span>{blog.createdBy}</span>
            </div>
            <span>•</span>
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>

          {isOwner && (
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/edit/${blog._id}`)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:shadow-red-500/20 transition-all"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </motion.button>
            </div>
          )}

          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed">{blog.content}</p>
          </div>

          {/* Comments Section */}
          <div className="mt-12 space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-cyan-500" />
                <h2 className="text-2xl font-bold text-white">Comments ({comments.length})</h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowComments((prev) => !prev)}
                className="px-4 py-2 rounded-xl border border-gray-800 hover:border-cyan-500/30 text-gray-300 hover:text-cyan-400 transition-colors"
              >
                {showComments ? 'Hide Comments' : 'Show Comments'}
              </motion.button>
            </div>

            {showComments && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {comments.map((comment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-gray-900/50 to-black/50 p-6 rounded-xl border border-gray-800/50 backdrop-blur-xl"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                          <User className="w-4 h-4 text-cyan-400" />
                        </div>
                        <span className="font-medium text-white">{comment.username}</span>
                      </div>
                      <span className="text-sm text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-300">{comment.content}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            <div className="mt-8">
              <div className="relative">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full bg-black/50 text-white border border-gray-800 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 rounded-xl px-4 py-3 outline-none transition-all resize-none"
                  rows="4"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCommentSubmit}
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-3 rounded-xl hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                >
                  <Send className="w-4 h-4" />
                  Post Comment
                </motion.button>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, x: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-800 hover:border-cyan-500/30 text-gray-300 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetail;
