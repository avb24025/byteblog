import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: '', content: '', tags: '' });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/api/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
        navigate('/');
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `http://127.0.0.1:3000/api/blogs/${id}`,
        blog,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Blog updated successfully');
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error('Error updating blog:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 font-playfair bg-black">
      <div className="card bg-base-100 w-full max-w-2xl shadow-2xl">
        <form className="card-body space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              value={blog.title}
              onChange={(e) => setBlog({ ...blog, title: e.target.value })}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Tags</span>
            </label>
            <input
              type="text"
              value={blog.tags}
              onChange={(e) => setBlog({ ...blog, tags: e.target.value })}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <textarea
              value={blog.content}
              onChange={(e) => setBlog({ ...blog, content: e.target.value })}
              className="textarea textarea-bordered h-40"
              required
            ></textarea>
          </div>
          <div className="form-control mt-6">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdate}
            >
              Update Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
