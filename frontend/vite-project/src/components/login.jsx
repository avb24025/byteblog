import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/user/login', { username, password });
            localStorage.setItem('token', response.data.token);
            navigate('/home'); // Redirect to the home page after login
        } catch (error) {
            setError('Invalid username or password');
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen font-playfair bg-black">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                    "Log in to stay connected with your favorite blogs, track your posts, and discover new stories that inspire and engage."
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit} className="card-body">
                        {error && <p className="text-red-500 text-center">{error}</p>}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Username"
                                className="input input-bordered"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="form-control mt-6 text-center">
                        <p className="text-blue-500 cursor-pointer underline hover:text-blue-700 mb-4" onClick={() => navigate('/signup')}>
                            Create Account Signup
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;