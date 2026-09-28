import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../context/AuthContext'// Path to your AuthContext

// Fetch current user's saved diet plan on page load
export const fetchUserDiet = createAsyncThunk(
  'diet/fetchUserDiet',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/diet/latest');
      return response.data.plan;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load diet plan');
    }
  }
);

// Generate a new AI plan and save to user profile
export const generateDiet = createAsyncThunk(
  'diet/generateDiet',
  async (dietPreferences, { rejectWithValue }) => {
    try {
      const response = await api.post('/diet/generate', dietPreferences);
      return response.data.plan;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to generate meal plan');
    }
  }
);