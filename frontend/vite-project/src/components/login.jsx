import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:3000/api/user/login', { username, password });
            localStorage.setItem('token', response.data.token);
            navigate('/home');
        } catch (error) {
            setError('Invalid username or password');
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="min-h-screen font-playfair bg-gradient-to-b from-black to-[#0a0a0a] flex items-center justify-center px-4 py-16 relative">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-[#0a0a0a]" />

            {/* Floating Elements - Hidden on Mobile */}
            {/* <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
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
                    className="absolute bottom-1/4 right-10 w-24 h-24 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 backdrop-blur-sm border border-cyan-500/20"
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
            </div> */}

            {/* Content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                {/* Left Section - Text */}
                <motion.div 
                    className="flex-1 text-center lg:text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-cyan-600 bg-clip-text text-transparent">
                        Welcome Back!
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-xl mx-auto lg:mx-0">
                        "Log in to stay connected with your favorite blogs, track your posts, and discover new stories that inspire and engage."
                    </p>
                </motion.div>

                {/* Right Section - Form */}
                <motion.div 
                    className="w-full max-w-md"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="bg-gradient-to-br from-gray-900/50 to-black/50 p-8 rounded-2xl border border-gray-800/50 backdrop-blur-xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-500/10 text-red-500 px-4 py-3 rounded-lg text-sm text-center"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <div className="space-y-2">
                                <label className="text-gray-300 text-sm font-medium">Username</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full bg-black/50 text-white border border-gray-800 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 rounded-xl px-10 py-3 outline-none transition-all"
                                        placeholder="Enter your username"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-gray-300 text-sm font-medium">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-black/50 text-white border border-gray-800 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 rounded-xl px-10 py-3 outline-none transition-all"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-3 rounded-xl hover:shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 group"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Login
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-gray-400">
                                Don't have an account?{' '}
                                <motion.button
                                    onClick={() => navigate('/signup')}
                                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Sign up
                                </motion.button>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;