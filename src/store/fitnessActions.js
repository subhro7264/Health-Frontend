import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFitnessData = createAsyncThunk(
  'fitness/fetchFitnessData',
  
  async (_, { rejectWithValue }) => {

    try {
      const token = localStorage.getItem('token'); 

      if (!token) {
        return rejectWithValue('No authentication token found. Please log in.');
      }

      const response = await axios.get('http://localhost:5000/api/fit/summary', {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Format dates for the X-Axis before saving to Redux
      const formattedData = response.data.data.map(item => ({
        ...item,
        displayDate: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      }));

      return formattedData;
    } catch (err) {
      console.error('Error fetching data:', err);
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch fitness data');
    }
  }
);