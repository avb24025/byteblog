import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard';
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/blogs');
        setBlogs(response.data);
        setFilteredBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = blogs.filter(blog =>
      blog.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredBlogs(filtered);
  };

  return (
    <div className="min-h-screen bg-black text-white font-playfair">
      {/* Spacer for navbar */}
      <div className="h-[72px] bg-black"></div>
      
      {/* Hero Section */}
      <div className="w-full bg-black py-24 relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-600 bg-clip-text text-transparent"
            >
              Discover Amazing Stories
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-gray-300 text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed"
            >
              Explore the latest insights, tutorials, and stories from our community of passionate writers and developers.
            </motion.p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-2xl mx-auto mt-12"
          >
            <div className="relative group">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-8 py-5 bg-black/60 backdrop-blur-sm border-2 border-cyan-500/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300 shadow-lg shadow-cyan-500/5"
              />
              <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-cyan-400 w-6 h-6 transition-colors group-hover:text-cyan-300" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Blog Grid Section */}
      <div className="bg-black min-h-screen">
        <div className="container mx-auto px-4 py-12">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-cyan-500/20 rounded-full animate-pulse"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-cyan-500 rounded-full animate-spin border-t-transparent"></div>
              </div>
            </div>
          ) : filteredBlogs.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center max-w-7xl mx-auto"
            >
              {filteredBlogs.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="w-full max-w-md"
                >
                  <BlogCard
                    title={blog.title}
                    content={blog.content}
                    author={blog.createdBy}
                    createdAt={blog.createdAt}
                    id={blog._id}
                    imageUrl={`http://127.0.0.1:3000/${blog.imageUrl.replace(/\\/g, '/')}`}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-400 text-xl">No articles found matching your search.</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800/50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-cyan-400 mb-2">ByteBlog</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Providing reliable tech insights since 2005
              </p>
            </div>

            <div className="flex gap-6">
              <motion.a
                href="https://leetcode.com/u/avb_24/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <SiLeetcode size={24} />
              </motion.a>
              <motion.a
                href="https://github.com/avb24025"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <FaGithub size={24} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/aditya-bhosale-a53481259/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <FaLinkedinIn size={24} />
              </motion.a>
            </div>

            <div className="text-gray-500 text-sm">
              <p>© {new Date().getFullYear()} ByteBlog. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
