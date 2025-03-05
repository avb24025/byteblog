import React, { useState, useEffect } from 'react';
import axios from 'axios';
import fetchUsername from './fetchUsername';
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Profile = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserAndBlogs = async () => {
      try {
        const username = await fetchUsername();
        if (!username) {
          setError('User not logged in');
          setLoading(false);
          return;
        }

        const userResponse = await axios.get(`/api/user/${username}`);
        setUser(userResponse.data);

        const blogsResponse = await axios.get(`/api/blogs/by-user/${username}`);
        setUserBlogs(blogsResponse.data);
      } catch (error) {
        console.error('Error fetching user or blogs:', error);
        setError('Failed to load user data or blogs.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndBlogs();
  }, []);

  return (
    <div className="min-h-screen font-playfair bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-red-500 bg-red-500/10 p-4 rounded-lg"
          >
            <p>{error}</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Profile Card */}
            <div className="max-w-4xl mx-auto mb-12">
              <motion.div 
                className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-black to-gray-900 shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Background Image with Overlay */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT41Yu0i98rX83hq9AmHP0VGw8HaxonDBZG4Q&s)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                
                {/* Content */}
                <div className="relative z-10 p-8">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-cyan-400/30 shadow-lg shadow-cyan-400/20">
                      <img
                        src="https://imgs.search.brave.com/Wy9yeON3-cT0jG1XYVChtQhRHqReCB8MUuscX8tdfx0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTEz/MTE2NDU0OC92ZWN0/b3IvYXZhdGFyLTUu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PUNLNDlTaExKd0R4/RTRraXJvQ1I0Mmtp/bVR1dWh2dW8yRkg1/eV82YVNnRW89"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <h1 className="mt-6 text-3xl font-bold text-white">
                      {user.name || 'User Profile'}
                    </h1>
                    
                    <p className="mt-2 text-cyan-400 font-medium">
                      @{user.username}
                    </p>
                    
                    {user.email && (
                      <p className="mt-2 text-gray-400">
                        {user.email}
                      </p>
                    )}
                    
                    {user.bio && (
                      <p className="mt-4 text-gray-300 text-center max-w-2xl">
                        {user.bio}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Blogs Section */}
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">
                My Contributions
              </h2>

              <div className="grid gap-6">
                {userBlogs.length > 0 ? (
                  userBlogs.map((blog) => (
                    <motion.div
                      key={blog._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-xl border border-gray-800 hover:border-cyan-500/30 transition-colors shadow-lg"
                    >
                      <Link
                        to={`/blog/${blog._id}`}
                        className="block text-xl font-bold text-white hover:text-cyan-400 transition-colors"
                      >
                        {blog.title}
                      </Link>
                      <p className="mt-2 text-gray-400">
                        {blog.excerpt || 'No excerpt available.'}
                      </p>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 bg-gray-900/50 rounded-xl border border-gray-800"
                  >
                    <p className="text-gray-400 text-lg">No blogs found for this user.</p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Profile;
