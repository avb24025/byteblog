import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/nav';
import Home from './components/Home';
import CreateBlog from './components/create';
import Login from './components/login';
import Signup from './components/signup';
import Land from './components/Land';
import BlogDetail from './components/BlogDetail';
import Profile from './components/profile';
import EditBlog from './components/edit'; // Import EditBlog component
import BookmarkPage from './components/bookmark';
import { Toaster } from 'react-hot-toast';

const App = () => {
    return (
        <>
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: '#1a1a1a',
                        color: '#fff',
                        border: '1px solid rgba(74, 222, 128, 0.1)',
                    },
                    success: {
                        icon: '🎉',
                        duration: 3000,
                    },
                    error: {
                        icon: '❌',
                        duration: 3000,
                    }
                }}
            />
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Land />} /> 
                    <Route path="/home" element={<Home />} />
                    <Route path="/create" element={<CreateBlog />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/blog/:id" element={<BlogDetail />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/edit/:id" element={<EditBlog />} />
                    <Route path="/bookmark" element={<BookmarkPage />} />  {/* New route for editing */}
                </Routes>
            </Router>
        </>
    );
};

export default App;
