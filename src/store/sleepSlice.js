import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchWeeklySleep = createAsyncThunk('sleep/fetchWeekly', async (startOfWeek, { getState }) => {
  // Option A: Get token from your Redux auth slice state
  const token = getState().auth?.token || localStorage.getItem('token'); 
  
  const response = await axios.get(`http://localhost:5000/api/weekly?startOfWeek=${startOfWeek}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
});

export const updateSleepHours = createAsyncThunk('sleep/updateHours', async ({ startOfWeek, day, hours }) => {
  const response = await axios.post(`${API_URL}/update`, { startOfWeek, day, hours });
  return response.data; // Return the full data payload object
});

const sleepSlice = createSlice({
  name: 'sleep',
  initialState: {
    hours: { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 },
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle Fetch
      .addCase(fetchWeeklySleep.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeeklySleep.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Handle both standard document returns and fallback arrays gracefully
        state.hours = action.payload?.sleepHours || action.payload || state.hours;
      })
      .addCase(fetchWeeklySleep.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // Handle Update
      .addCase(updateSleepHours.fulfilled, (state, action) => {
        // This ensures that when you toggle input fields, the state updates in real-time
        state.hours = action.payload?.sleepHours || action.payload || state.hours;
      });
  }
});

export default sleepSlice.reducer;