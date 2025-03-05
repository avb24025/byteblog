import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark, Clock, User } from 'lucide-react';
import { toast } from 'react-hot-toast';

const BookmarkPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookmarks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log('Step 1: Fetching bookmark IDs...');

        // Step 1: Get bookmark IDs
        const idsResponse = await axios.get('http://127.0.0.1:3000/api/blogs/bookmarks/ids', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Bookmark IDs response:', idsResponse.data);
        
        if (!idsResponse.data.success) {
          console.log('No bookmarks found');
          setBookmarks([]);
          return;
        }

        const bookIds = idsResponse.data.bookIds;
        if (!bookIds || bookIds.length === 0) {
          console.log('No bookmark IDs found');
          setBookmarks([]);
          return;
        }

        // Step 2: Fetch blog details for each ID
        console.log('Step 2: Fetching blog details for IDs:', bookIds);
        const bookmarkedBlogs = [];
        
        const blogPromises = bookIds.map(blogId => 
          axios.get(`http://127.0.0.1:3000/api/blogs/bookmarks/blog/${blogId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          .then(response => {
            if (response.data.success && response.data.blog) {
              bookmarkedBlogs.push(response.data.blog);
            }
          })
          .catch(error => {
            console.error(`Error fetching blog ${blogId}:`, error);
          })
        );

        await Promise.all(blogPromises);

        console.log(`Found ${bookmarkedBlogs.length} bookmarked blogs`);
        setBookmarks(bookmarkedBlogs);
        
        if (bookmarkedBlogs.length > 0) {
          toast.success(`Found ${bookmarkedBlogs.length} bookmarked blogs`);
        } else {
          toast.info('No bookmarked blogs found');
        }
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        setError(error.response?.data?.error || 'Failed to fetch bookmarks');
        toast.error('Failed to fetch bookmarks');
        setBookmarks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-24">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <Link to="/home" className="text-cyan-500 hover:text-cyan-400">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center gap-2">
            <Bookmark className="text-cyan-500" />
            Your Bookmarks
          </h1>
          <p className="text-gray-400">All your saved articles in one place</p>
        </motion.div>

        {bookmarks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">No bookmarks yet</p>
            <Link to="/home" className="text-cyan-500 hover:text-cyan-400 mt-2 inline-block">
              Explore articles to bookmark
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl border border-gray-800/50 overflow-hidden hover:border-cyan-500/30 transition-all duration-300 group"
              >
                <Link to={`/blog/${blog._id}`}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={`http://127.0.0.1:3000/${blog.imageUrl?.replace(/\\/g, '/')}`}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                      {blog.title}
                    </h2>
                    <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{blog.createdBy}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 line-clamp-2 text-sm">{blog.content}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkPage; 