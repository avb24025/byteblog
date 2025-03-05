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
    <div className="w-full max-w-sm mx-auto transition-all duration-300 font-playfair bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl border border-gray-800/50 hover:border-cyan-500/30">
      {/* Login Alert */}
      {showLoginAlert && (
        <div role="alert" className="alert alert-warning fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md mx-auto shadow-lg">
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
          <span className="text-sm sm:text-base">Please log in first to view the blog.</span>
          <div className="flex gap-2">
            <button 
              className="btn btn-sm bg-gray-700 hover:bg-gray-600 text-white border-none" 
              onClick={() => setShowLoginAlert(false)}
            >
              Dismiss
            </button>
            <button 
              className="btn btn-sm bg-cyan-500 hover:bg-cyan-600 text-white border-none" 
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-[16/10] group overflow-hidden rounded-t-xl">
        <img
          src={imageUrl || "https://via.placeholder.com/150"}
          alt="Blog Image"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black to-transparent">
          <div className="flex items-center justify-between text-white text-sm">
            <span className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span>{author}</span>
            </span>
            <span className="text-gray-300 text-sm">
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <Link
          to={`/blog/${id}`}
          onClick={handleTitleClick}
          className="block"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 hover:text-cyan-400 transition-colors line-clamp-2">
            {title}
          </h2>
        </Link>
        <p className="text-gray-400 text-sm sm:text-base line-clamp-3 mb-6">
          {content}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-cyan-400 text-sm">Read more</span>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
