import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import fetchUsername from './fetchUsername'; // Import the fetchUsername function

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(true);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [username, setUsername] = useState(null); // State to store logged-in username
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch the blog and comments data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogResponse = await axios.get(`http://127.0.0.1:3000/api/blogs/${id}`);
        setBlog(blogResponse.data);

        const commentsResponse = await axios.get(`http://127.0.0.1:3000/api/blogs/${id}/comments`);
        setComments(commentsResponse.data || []);
      } catch (error) {
        console.error('Error fetching blog or comments:', error);
        navigate('/'); // Redirect to home page on error
      }
    };

    fetchBlog();
  }, [id, navigate]);

  // Fetch username when component mounts
  useEffect(() => {
    const getUsername = async () => {
      const loggedInUsername = await fetchUsername();
      setUsername(loggedInUsername);
    };

    getUsername();
  }, []);

  // Handle deleting the blog
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
        console.error('Error deleting blog:', error.response ? error.response.data : error.message);
      }
    }
  };

  // Handle submitting a new comment
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return; // Don't post if the comment is empty

    const token = localStorage.getItem('token');
    if (!token) {
      setShowLoginAlert(true);
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:3000/api/blogs/${id}/comments`,
        { content: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error.response ? error.response.data : error.message);
    }
  };

  if (!blog) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const isOwner = blog.createdBy === username; // Check if the logged-in user is the owner of the blog

  console.log('Blog Created By:', blog.createdBy);
  console.log('Logged-In Username:', username);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-playfair">
      {showLoginAlert && (
        <div role="alert" className="alert alert-warning fixed top-0 left-0 right-0 z-10 mx-auto w-96">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info h-6 w-6 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Please log in first to post a comment.</span>
          <div>
            <button className="btn btn-sm" onClick={() => setShowLoginAlert(false)}>Deny</button>
            <button className="btn btn-sm btn-primary" onClick={() => navigate('/login')}>Login</button>
          </div>
        </div>
      )}

      {/* Blog Image */}
      <div className="mb-8">
        <img
          src={`http://127.0.0.1:3000/${blog.imageUrl?.replace(/\\/g, '/')}`}
          alt={blog.title}
          className="w-full h-[400px] object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Blog Title and Info */}
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <div className="flex items-center space-x-4 mb-8 text-gray-600">
        <span>By {blog.createdBy}</span>
        <span>•</span>
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Edit and Delete Buttons (Visible for Owner Only) */}
      {isOwner && (
        <div className="flex space-x-4 mb-8">
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/edit/${blog._id}`)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}

      {/* Blog Content */}
      <div className="prose max-w-none mb-8">{blog.content}</div>

      {/* Comments Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
          <button
            onClick={() => setShowComments(!showComments)}
            className="btn btn-outline"
          >
            {showComments ? 'Hide Comments' : 'Show Comments'}
          </button>
        </div>

        {showComments && (
          <div className="space-y-4 mt-4">
            {comments.map((comment, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg flex items-start space-x-4">
                <img
                  src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNKfj6RsyRZqO4nnWkPFrYMmgrzDmyG31pFQ&s`}
                  alt={comment.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">{comment.username}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-2">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-gray-300"
            rows="4"
          ></textarea>
          <button
            onClick={handleCommentSubmit}
            className="mt-4 btn btn-primary"
          >
            Post Comment
          </button>
        </div>

        <button onClick={() => navigate(-1)} className="mt-8 btn btn-outline">
          ← Back
        </button>
      </div>
    </div>
  );
};

export default BlogDetail;
