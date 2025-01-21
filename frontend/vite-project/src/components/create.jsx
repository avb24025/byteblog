import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
    <div className="flex justify-center items-center min-h-screen bg-base-200 font-playfair bg-black">
      <div className="card bg-base-100 w-full max-w-2xl shadow-2xl rounded-none"> {/* Removed border radius */}
        <form onSubmit={handleSubmit} className="card-body space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="Enter your blog title"
              className="input input-bordered rounded-none" // Removed border radius
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Tags</span>
            </label>
            <input
              type="text"
              placeholder="Enter tags separated by commas"
              className="input input-bordered rounded-none" // Removed border radius
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <textarea
              placeholder="Write your blog content here..."
              className="textarea textarea-bordered h-40 rounded-none" // Removed border radius
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered rounded-none" // Removed border radius
              onChange={handleImageChange}
            />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary rounded-none"> {/* Removed border radius */}
              Create Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
