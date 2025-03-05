import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, Tag, Type, FileText } from 'lucide-react';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('tags', tags.split(',').map((tag) => tag.trim()));
    if (image) {
      formData.append('image', image);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/home');
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-playfair pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-cyan-600 bg-clip-text text-transparent">
            Create Your Story
          </h1>
          <p className="text-gray-400 text-lg">
            Share your thoughts and insights with the community
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#14213d]/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 md:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-300 font-medium">
                <Type className="w-5 h-5 text-cyan-500" />
                Title
              </label>
              <input
                type="text"
                placeholder="Enter your blog title"
                className="w-full px-4 py-3 bg-black/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Tags Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-300 font-medium">
                <Tag className="w-5 h-5 text-cyan-500" />
                Tags
              </label>
              <input
                type="text"
                placeholder="technology, programming, web development"
                className="w-full px-4 py-3 bg-black/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            {/* Content Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-300 font-medium">
                <FileText className="w-5 h-5 text-cyan-500" />
                Content
              </label>
              <textarea
                placeholder="Write your story here..."
                className="w-full h-64 px-4 py-3 bg-black/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-gray-300 font-medium">
                <Upload className="w-5 h-5 text-cyan-500" />
                Cover Image
              </label>
              <div className="flex flex-col items-center justify-center w-full">
                <label className="w-full cursor-pointer">
                  <div className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg ${previewUrl ? 'border-cyan-500/50' : 'border-gray-600'} bg-black/30 hover:bg-black/50 transition-all duration-300`}>
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-full w-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 text-cyan-500 mb-3" />
                        <p className="mb-2 text-sm text-gray-400">
                          <span className="font-medium">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 800x400px)</p>
                      </div>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-4 rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 font-medium"
            >
              Publish Story
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateBlog;
