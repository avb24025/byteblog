import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    // Initial check
    checkAuth();

    // Add event listeners
    window.addEventListener('storage', checkAuth);

    // Check auth status when component mounts and when token changes
    const interval = setInterval(checkAuth, 1000);

    return () => {
      window.removeEventListener('storage', checkAuth);
      clearInterval(interval);
    };
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        navigate("/home");
        return;
      }

      const response = await axios.post(
        "http://127.0.0.1:3000/api/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setIsMobileMenuOpen(false);
        navigate("/home");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      // If there's an error, still remove token and redirect
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setIsMobileMenuOpen(false);
      navigate("/home");
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-md shadow-lg border-b border-gray-800/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/home" 
            className="text-2xl font-bold text-cyan-400 font-playfair hover:text-cyan-300 transition-colors"
          >
            ByteBlog
          </Link>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300"
            >
              <Menu className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-8 text-gray-300">
              <Link 
                to="/home" 
                className="hover:text-cyan-400 transition-colors flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-cyan-500/10"
              >
                Home
              </Link>
              <Link 
                to="/create" 
                className="hover:text-cyan-400 transition-colors flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-cyan-500/10"
              >
                Create Blog
              </Link>
              <Link 
                to="/bookmark" 
                className="hover:text-cyan-400 transition-colors flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-cyan-500/10"
              >
                Bookmarks
              </Link>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="dropdown dropdown-end">
                  <div 
                    tabIndex={0} 
                    role="button" 
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-cyan-500/10 transition-colors cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-full ring-2 ring-cyan-500/20 overflow-hidden">
                      <img 
                        alt="User Avatar" 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqvWNRV-8OkzVtXCW22GVsym8K8dKNtAEqew&s"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <ul 
                    tabIndex={0} 
                    className="dropdown-content menu p-2 shadow-lg bg-black/90 backdrop-blur-md border border-gray-800/50 rounded-xl w-52 mt-2"
                  >
                    <li>
                      <Link 
                        to="/profile" 
                        className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg px-4 py-3 transition-all"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg px-4 py-3 transition-all w-full text-left"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <motion.button
                onClick={handleLogin}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-cyan-500/20 transition duration-300"
              >
                Login
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-black/95 backdrop-blur-md border-b border-gray-800/50"
          >
            <div className="px-4 py-4 space-y-4">
              <Link 
                to="/home" 
                className="block text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 px-4 py-3 rounded-lg"
              >
                Home
              </Link>
              <Link 
                to="/create" 
                className="block text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 px-4 py-3 rounded-lg"
              >
                Create Blog
              </Link>
              <Link 
                to="/bookmark" 
                className="block text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 px-4 py-3 rounded-lg"
              >
                Bookmarks
              </Link>
              
              {isAuthenticated ? (
                <div className="border-t border-gray-800/50 pt-4 mt-4">
                  <div className="flex items-center gap-3 mb-4 px-4">
                    <div className="w-10 h-10 rounded-full ring-2 ring-cyan-500/20 overflow-hidden">
                      <img 
                        alt="User Avatar" 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqvWNRV-8OkzVtXCW22GVsym8K8dKNtAEqew&s"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-white font-medium">Your Profile</p>
                      <p className="text-gray-400 text-sm">Manage your account</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Link 
                      to="/profile" 
                      className="block w-full text-left px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all duration-300"
                    >
                      View Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all duration-300"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <motion.button
                  onClick={handleLogin}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-6 py-3 rounded-full hover:shadow-lg hover:shadow-cyan-500/20 transition duration-300"
                >
                  Login
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavBar;
