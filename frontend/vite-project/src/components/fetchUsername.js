import { useEffect, useState } from 'react';
import axios from 'axios';

const fetchUsername = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  

  try {
    const response = await axios.get('http://127.0.0.1:3000/api/blogs/me', {
      headers: {
        Authorization: `Bearer ${token}`,  // Add the JWT token here
      },
    });
    return response.data.username;
  } catch (error) {
    console.error('Error fetching username:', error.response ? error.response.data : error.message);
    return null;
  }
};

export default fetchUsername;
