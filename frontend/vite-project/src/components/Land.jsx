import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Code2, Rocket, Server, ChevronRight, TrendingUp, Clock, User, ArrowDown, Star, Search, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Custom SVG Icons
const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-cyan-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-cyan-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
  </svg>
);

const RocketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-cyan-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4-3.28 7.39-7 8.57V12H5V6.3l7-3.11v8.8z"/>
  </svg>
);

const ServerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-cyan-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M4 15v4h16v-4H4zm16-8H4v4h16V7zM4 3v4h16V3H4z"/>
  </svg>
);

export const Land = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    checkAuth();
    // Add event listener for storage changes
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/home");
  };

  const handleStartReading = () => {
    navigate("/home");
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const featuredPosts = [
    {
      title: "The Future of Web Development: What's Next in 2024",
      author: "Raju",
      readTime: "5 min read",
      category: "Technology",
      excerpt: "Exploring the upcoming trends and innovations that will shape the future of web development.",
      icon: <Code2 className="w-8 h-8 text-cyan-500" />
    },
    {
      title: "Building Scalable Systems: A Comprehensive Guide",
      author: "Messi",
      readTime: "7 min read",
      category: "Architecture",
      excerpt: "Learn the fundamental principles and best practices for building highly scalable systems.",
      icon: <Server className="w-8 h-8 text-cyan-500" />
    },
    {
      title: "Modern JavaScript Practices for Better Code",
      author: "Neymar",
      readTime: "6 min read",
      category: "Programming",
      excerpt: "Discover the latest JavaScript patterns and practices to write cleaner, more efficient code.",
      icon: <BookOpen className="w-8 h-8 text-cyan-500" />
    }
  ];

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-black to-[#0a0a0a] font-playfair">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/home" className="text-2xl font-bold text-cyan-400 font-playfair">ByteBlog</Link>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-cyan-400 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-8 text-gray-300">
              <Link to="/home" className="hover:text-cyan-400 transition-colors">Home</Link>
              <Link to="/create" className="hover:text-cyan-400 transition-colors">Create Blog</Link>
              <Link to="/bookmark" className="hover:text-cyan-400 transition-colors">Bookmarks</Link>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full ring-2 ring-cyan-500/20">
                      <img 
                        alt="User Avatar" 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqvWNRV-8OkzVtXCW22GVsym8K8dKNtAEqew&s"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-black/90 backdrop-blur-md border border-gray-800/50 rounded-xl w-52 mt-2">
                    <li>
                      <Link to="/profile" className="text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10">Profile</Link>
                    </li>
                    <li>
                      <button 
                        onClick={handleLogout}
                        className="text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10"
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

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
  <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-black/95 backdrop-blur-md border-b border-gray-800/50"
            >
              <div className="px-4 py-4 space-y-4">
                <Link to="/home" className="block text-gray-300 hover:text-cyan-400 transition-colors py-2">Home</Link>
                <Link to="/create" className="block text-gray-300 hover:text-cyan-400 transition-colors py-2">Create Blog</Link>
                <Link to="/bookmark" className="block text-gray-300 hover:text-cyan-400 transition-colors py-2">Bookmarks</Link>
                
                {isAuthenticated ? (
                  <div className="border-t border-gray-800/50 pt-4 mt-4">
                    <div className="flex items-center gap-3 mb-4">
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
                        className="block w-full text-left px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
                      >
                        View Profile
                      </Link>
    <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
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
                    className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-cyan-500/20 transition duration-300"
                  >
                    Login
                  </motion.button>
                )}
              </div>
  </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section - Full Screen */}
      <div className="relative min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=2074&auto=format&fit=crop"
            alt="Tech Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-[#0a0a0a]" />
</div>

        {/* Floating Tech Elements - Hide on Mobile */}
        <div className="absolute inset-0 z-10 overflow-hidden hidden md:block">
          <motion.div
            className="absolute top-1/4 left-10 w-32 h-32 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 backdrop-blur-sm border border-cyan-500/20"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/3 right-20 w-24 h-24 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 backdrop-blur-sm border border-cyan-500/20"
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
              <motion.div
            className="absolute bottom-1/4 left-20 w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 backdrop-blur-sm border border-cyan-500/20"
            animate={{
              y: [0, 15, 0],
              rotate: [0, 10, 0]
                }}
                transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto py-12 md:py-20 lg:py-32 flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="flex-1 text-center md:text-left px-4 sm:px-6"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-8 bg-gradient-to-br from-cyan-300 to-cyan-600 bg-clip-text text-transparent leading-tight"
            >
              Stay curious.
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="text-gray-300 text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 max-w-2xl mx-auto md:mx-0 leading-relaxed"
            >
              Discover stories, thinking, and expertise from writers on any topic. ByteBlog is a place where technology meets creativity.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex justify-center md:justify-start">
              <motion.button 
                onClick={handleStartReading}
                className="group bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-medium py-3 md:py-4 px-8 md:px-10 text-base md:text-lg rounded-full hover:shadow-lg hover:shadow-cyan-500/20 transition duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start reading
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Tech Cards Section - Hide on Mobile */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex-1 hidden lg:block"
          >
            <div className="relative w-full aspect-square rounded-2xl bg-gradient-to-br from-gray-900/30 to-black/30 backdrop-blur-sm p-8">
              {/* Tech Images Grid */}
              <div className="grid grid-cols-2 gap-6 h-full">
                {[
                  {
                    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
                    alt: "Code",
                    title: "Clean Code",
                    description: "Modern development practices",
                    delay: 0.2,
                    floatOffset: 10
                  },
                  {
                    src: "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop",
                    alt: "Tech",
                    title: "Innovation",
                    description: "Future technologies",
                    delay: 0.4,
                    floatOffset: -15
                  },
                  {
                    src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
                    alt: "Innovation",
                    title: "Architecture",
                    description: "Scalable solutions",
                    delay: 0.6,
                    floatOffset: 12
                  },
                  {
                    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
                    alt: "Future",
                    title: "AI & ML",
                    description: "Smart technologies",
                    delay: 0.8,
                    floatOffset: -8
                  }
                ].map((image, index) => (
                  <motion.div
                    key={index}
                    className="relative rounded-xl overflow-hidden group cursor-pointer"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      y: 0,
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 0.8,
                        y: [0, image.floatOffset, 0],
                      }}
                      transition={{ 
                        opacity: { duration: 0.3 },
                        y: {
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.2
                        }
                      }}
                      whileHover={{ opacity: 0.6 }}
                    />
                    
                    <motion.img 
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      animate={{ 
                        y: [0, image.floatOffset, 0],
                      }}
                      transition={{ 
                        y: {
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.2
                        }
                      }}
                      whileHover={{ scale: 1.1 }}
                    />

                    <motion.div 
                      className="absolute inset-0 p-4 flex flex-col justify-end"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ 
                        y: [0, image.floatOffset, 0],
                        opacity: 1 
                      }}
                      transition={{ 
                        opacity: { delay: image.delay + 0.2, duration: 0.4 },
                        y: {
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.2
                        }
                      }}
                    >
                      <motion.h3 
                        className="text-white font-bold text-lg mb-1"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {image.title}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-300 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: image.delay + 0.3 }}
                      >
                        {image.description}
                      </motion.p>
                    </motion.div>

                    <motion.div 
                      className="absolute inset-0 rounded-xl"
                      whileHover={{ 
                        boxShadow: "0 0 30px rgba(6, 182, 212, 0.3)"
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="relative z-10 bg-[#0a0a0a]">
        {/* Trending Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="px-4 sm:px-6 py-16 md:py-32 border-b border-gray-800/50"
        >
          <div className="max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-8 md:mb-16 justify-center"
            >
              <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-cyan-500" />
              <h2 className="text-2xl md:text-4xl font-bold text-white text-center">Trending on ByteBlog</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.6,
                    delay: index * 0.2,
                    ease: "easeOut"
                  }}
                  className="group relative bg-gradient-to-b from-gray-900/50 to-black/50 p-8 rounded-2xl border border-gray-800/50 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                        {post.icon}
                      </div>
                      <span className="text-2xl font-bold text-gray-600/50">0{index + 1}</span>
                    </div>
                    <div>
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 0.3 }}
                        className="flex items-center gap-2 mb-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                          <User className="w-4 h-4 text-cyan-500" />
                        </div>
                        <span className="text-sm text-gray-400">{post.author}</span>
                      </motion.div>
                      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-6 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{post.readTime}</span>
                        <span>·</span>
                        <span className="text-cyan-500">{post.category}</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Categories Section */}
        <div className="px-4 sm:px-6 py-16 md:py-32 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 md:mb-24"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                Discover more of what matters to you
              </h2>
              <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto px-4">
                Explore topics that interest you and find new perspectives in technology and development.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto px-4">
              {[
                {
                  title: "Programming",
                  icon: <Code2 className="w-6 h-6" />,
                  description: "Deep dive into coding practices and programming languages."
                },
                {
                  title: "Technology",
                  icon: <Rocket className="w-6 h-6" />,
                  description: "Stay updated with the latest tech trends and innovations."
                },
                {
                  title: "Software Architecture",
                  icon: <Server className="w-6 h-6" />,
                  description: "Learn about building scalable and maintainable systems."
                },
                {
                  title: "Web Development",
                  icon: <BookOpen className="w-6 h-6" />,
                  description: "Master modern web technologies and frameworks."
                },
                {
                  title: "System Design",
                  icon: <Server className="w-6 h-6" />,
                  description: "Explore principles of designing robust systems."
                },
                {
                  title: "Best Practices",
                  icon: <Star className="w-6 h-6" />,
                  description: "Learn industry standards and proven methodologies."
                }
              ].map((category, index) => (
              <motion.div
                key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ y: -5 }}
                  className="group relative bg-gradient-to-br from-gray-900 via-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-cyan-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors duration-300">
                      <div className="text-cyan-400">
                        {category.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                      {category.title}
                </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-cyan-400 group-hover:translate-x-2 transition-transform duration-300">
                      <span className="text-sm font-medium">Explore</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
              </motion.div>
            ))}
            </div>
          </div>
          </div>

        {/* Newsletter Section */}
        <section className="bg-gradient-to-b from-[#14213d]/50 to-[#14213d]/80 backdrop-blur-sm py-16 md:py-32 border-t border-b border-cyan-500/10 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
          <motion.div
              initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">Never miss a story.</h2>
              <p className="text-gray-300 text-base md:text-lg mb-8 md:mb-12 leading-relaxed max-w-2xl mx-auto">
                Get unlimited access to the best technical stories and insights. Join our growing community of tech enthusiasts.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <input
                type="email"
                placeholder="Enter your email"
                  className="w-full md:w-96 px-4 md:px-6 py-3 md:py-4 rounded-full bg-black/50 text-white border border-cyan-500/30 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                />
                <motion.button 
                  className="w-full md:w-auto bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-8 md:px-12 py-3 md:py-4 rounded-full hover:shadow-lg hover:shadow-cyan-500/20 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
            </div>
            </motion.div>
        </div>
      </section>

      {/* Footer */}
        <footer className="bg-black/50 backdrop-blur-sm text-white py-16 md:py-24 px-4 sm:px-6 border-t border-gray-800/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div>
                <h3 className="text-xl font-bold mb-4 text-cyan-400">ByteBlog</h3>
                <p className="text-gray-400 leading-relaxed">Where technology meets creativity.</p>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-4 text-white">Explore</h4>
                <ul className="space-y-3 text-gray-400">
                  <li><a href="#" className="hover:text-cyan-400 transition-colors">Technology</a></li>
                  <li><a href="#" className="hover:text-cyan-400 transition-colors">Programming</a></li>
                  <li><a href="#" className="hover:text-cyan-400 transition-colors">Architecture</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-4 text-white">Company</h4>
                <ul className="space-y-3 text-gray-400">
                  <li><a href="#" className="hover:text-cyan-400 transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-4 text-white">Legal</h4>
                <ul className="space-y-3 text-gray-400">
                  <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 md:mt-16 pt-8 text-center text-gray-400">
              <p>© 2024 ByteBlog. All rights reserved.</p>
            </div>
          </div>
      </footer>
      </div>
    </div>
  );
};

export default Land;
