import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu toggle

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "/api/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      navigate("/home");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className={`navbar bg-base-100 sticky top-0 z-50 shadow-md transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="flex-none">
        <Link to="/home" className="btn btn-ghost normal-case text-xl text-primary font-playfair">
          ByteBlog
        </Link>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className="flex-1 lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="btn btn-ghost text-xl"
        >
          ☰
        </button>
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-base-100 shadow-md p-2">
            <ul className="menu p-0">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/create">Create Blog</Link>
              </li>
              <li>
                <Link to="/discuss">Discuss</Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Desktop Menu */}
      <div className="flex-1 hidden lg:flex justify-center font-playfair">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/create">Create Blog</Link>
          </li>
          <li>
            <Link to="/discuss">Discuss</Link>
          </li>
        </ul>
      </div>

      <div className="flex-none ml-auto">
        {isAuthenticated ? (
          <>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="User Avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqvWNRV-8OkzVtXCW22GVsym8K8dKNtAEqew&s"></img>
                </div>
              </div>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 font-playfair rounded-box w-52">
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <button onClick={handleLogin}
        className="btn btn-primary px-4 py-0.4 text-sm rounded-md shadow-md hover:bg-primary-focus  font-playfair transition-colors duration-200">
  Login
</button>

        )}
      </div>
    </div>
  );
};

export default NavBar;
