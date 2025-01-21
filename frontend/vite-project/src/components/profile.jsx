import React, { useState, useEffect } from 'react';
import axios from 'axios';
import fetchUsername from './fetchUsername';
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { Link } from 'react-router-dom'; // Import Link component

const Profile = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [error, setError] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light"); // Get theme from localStorage

  useEffect(() => {
    const fetchUserAndBlogs = async () => {
      try {
        const username = await fetchUsername(); // Get the username of the logged-in user
        if (!username) {
          setError('User not logged in');
          setLoading(false);
          return;
        }

        // Fetch user details based on the username
        const userResponse = await axios.get(`/api/user/${username}`);
        setUser(userResponse.data);

        // Fetch blogs created by the user
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
    <div className={`min-h-screen font-playfair flex flex-col text-white bg-black`}>
      <div className="container mx-auto px-4 py-8 flex-grow">
        {loading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        ) : (
          <>
            {/* User Profile Section with Background Image */}
            <div
              className="bg-white dark:bg-gray-800 p-4 border-gray-300 shadow-lg mb-12 text-center mx-auto w-full sm:w-3/4 md:w-1/2 lg:w-1/2"
              style={{
                backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT41Yu0i98rX83hq9AmHP0VGw8HaxonDBZG4Q&s)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <img
                src="https://imgs.search.brave.com/Wy9yeON3-cT0jG1XYVChtQhRHqReCB8MUuscX8tdfx0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTEz/MTE2NDU0OC92ZWN0/b3IvYXZhdGFyLTUu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PUNLNDlTaExKd0R4/RTRraXJvQ1I0Mmtp/bVR1dWh2dW8yRkg1/eV82YVNnRW89"
                alt="Profile"
                className="w-16 h-16 mx-auto rounded-full border-2 border-gray-300 mb-4"
              />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {user.name || 'User Profile'}
              </h1>
              <p className="text-md text-gray-600 dark:text-gray-300 mb-2">
                @{user.username}
              </p>
              {user.email && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Email: {user.email}
                </p>
              )}
              {user.bio && (
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  {user.bio}
                </p>
              )}
            </div>

            {/* Contributions Section */}
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                My Contributions
              </h2>
            </div>

            {/* Blogs Section */}
            <div>
              {userBlogs.length > 0 ? (
                <div className="flex flex-col space-y-4 items-center">
                  {userBlogs.map((blog) => (
                    <div
                      key={blog._id}
                      className="bg-white dark:bg-gray-800 p-4 shadow-md border border-gray-300 w-full max-w-md"
                    >
                      <Link
                        to={`/blog/${blog._id}`}
                        className="block text-xl font-bold text-white hover:underline"
                      >
                        {blog.title}
                      </Link>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {blog.excerpt || 'No excerpt available.'}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center mt-8">
                  <p className="text-gray-500 text-lg">No blogs found for this user.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
