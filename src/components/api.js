// api.js

import axios from 'axios';

// Function to fetch current user details
export const getCurrentUserDetails = async () => {
  try {
    const response = await axios.get('http://localhost:3000/user/current-user');
    return response.data; // Return the current user's details
  } catch (error) {
    console.error('Error fetching current user details:', error);
    throw new Error('Failed to fetch current user details'); // Handle error appropriately
  }
};
