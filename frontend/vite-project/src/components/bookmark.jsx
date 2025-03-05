import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Bookmark, User, Clock } from 'lucide-react';
import fetchUsername from './fetchUsername';
import { toast } from 'react-hot-toast';

const BookmarkPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

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
          setLoading(false);
          return;
        }

        const bookIds = idsResponse.data.bookIds;
        if (!bookIds || bookIds.length === 0) {
          console.log('No bookmark IDs found');
          setBookmarks([]);
          setLoading(false);
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
        setError('Failed to fetch bookmarks');
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
      <div className="min-h-screen bg-gradient-to-b from-black to-[#0a0a0a] flex justify-center items-center pt-24">
        <div className="w-16 h-16 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-[#0a0a0a] flex justify-center items-center pt-24">
        <div className="bg-gradient-to-br from-gray-900/50 to-black/50 p-8 rounded-2xl border border-gray-800/50 backdrop-blur-xl text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-gray-300 mb-6">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#0a0a0a] font-playfair pt-24">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-12">
          <Bookmark className="w-8 h-8 text-cyan-500" />
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-300 to-cyan-600 bg-clip-text text-transparent">
            Your Bookmarks
          </h1>
        </div>

        {bookmarks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No bookmarks yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl border border-gray-800/50 overflow-hidden group cursor-pointer"
                onClick={() => navigate(`/blog/${blog._id}`)}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
                  <img
                    src={`http://127.0.0.1:3000/${blog.imageUrl?.replace(/\\/g, '/')}`}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                    {blog.title}
                  </h2>

                  <div className="flex items-center gap-4 text-gray-400 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{blog.createdBy}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkPage;
