import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard';
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light"); // Get theme from localStorage

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
    <div className={`min-h-screen flex flex-col ${theme === "light" ? "text-black" : "text-white"} bg-black`}> {/* Add conditional text color */}
      <div className="container mx-auto px-4 py-8 flex-grow">
        <form onSubmit={(e) => e.preventDefault()} className="flex items-center justify-center space-x-4 mb-12">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="input input-bordered w-full max-w-md font-playfair"
          />
        </form>
        {loading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
            {filteredBlogs.map((blog) => (
              <div key={blog._id} className="w-full max-w-sm">
                <BlogCard
                  title={blog.title}
                  content={blog.content}
                  author={blog.createdBy}
                  createdAt={blog.createdAt}
                  id={blog._id}
                  imageUrl={`http://127.0.0.1:3000/${blog.imageUrl.replace(/\\/g, '/')}`}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-8">
            <p className="text-gray-500 text-lg">No results found.</p>
          </div>
        )}
      </div>

      <footer className="footer footer-center bg-primary text-primary-content p-10 mt-auto font-playfair">
        <aside>
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="inline-block fill-current">
            <path
              d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg>
          <p className="font-bold">
            AVB Industries Ltd.
            <br />
            Providing reliable tech since 2005
          </p>
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a href="https://leetcode.com/u/avb_24/" aria-label="LeetCode">
              <SiLeetcode size={23} />
            </a>
            <a href="https://github.com/avb24025" aria-label="GitHub">
              <FaGithub size={23} />
            </a>
            <a href="https://www.linkedin.com/in/aditya-bhosale-a53481259/" aria-label="LinkedIn">
              <FaLinkedinIn size={23} />
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Home;
