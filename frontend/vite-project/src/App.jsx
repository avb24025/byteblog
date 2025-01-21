import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/nav';
import Home from './components/Home';
import CreateBlog from './components/create';
import Discuss from './components/discuss';
import Login from './components/login';
import Signup from './components/signup';
import Land from './components/Land';
import BlogDetail from './components/BlogDetail';
import Profile from './components/profile';
import EditBlog from './components/edit'; // Import EditBlog component

const App = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Land />} /> 
                <Route path="/home" element={<Home />} />
                <Route path="/create" element={<CreateBlog />} />
                <Route path="/discuss" element={<Discuss />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/edit/:id" element={<EditBlog />} /> {/* New route for editing */}
            </Routes>
        </Router>
    );
};

export default App;
