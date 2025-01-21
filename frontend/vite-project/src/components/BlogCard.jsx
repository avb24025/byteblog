import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BlogCard = ({ title, content, author, createdAt, id, imageUrl }) => {
  const [showLoginAlert, setShowLoginAlert] = useState(false); // State for login alert
  const navigate = useNavigate();

  // Handle blog title click
  const handleTitleClick = (e) => {
    const token = localStorage.getItem('token');
    if (!token) {
      e.preventDefault();  // Prevent navigation
      setShowLoginAlert(true); // Show the login alert if not logged in
    }
  };

  return (
    <div className="w-96 h-96 overflow-hidden transition-all duration-300 font-playfair rounded-none">
      {/* Login Alert */}
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
          <span>Please log in first to view the blog.</span>
          <div>
            <button className="btn btn-sm" onClick={() => setShowLoginAlert(false)}>Deny</button>
            <button className="btn btn-sm btn-primary" onClick={() => navigate('/login')}>Login</button>
          </div>
        </div>
      )}

      <figure className="relative h-48 group">
        <img
          src={imageUrl || "https://via.placeholder.com/150"}
          alt="Blog Image"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>By {author}</span>
          <span className="float-right">{new Date(createdAt).toLocaleDateString()}</span>
        </div>
      </figure>
      <div className="p-6 bg-transparent text-white">
        <h2 className="text-2xl font-bold text-center mb-4 font-playfair">
          <Link
            to={`/blog/${id}`}
            className="hover:text-orange-500 transition-colors duration-300"
            onClick={handleTitleClick} // Add click handler here
          >
            {title}
          </Link>
        </h2>
        <p className="text-center line-clamp-2 mb-6">{content}</p>
      </div>
    </div>
  );
};

export default BlogCard;
