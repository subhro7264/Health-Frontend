import { createSlice } from '@reduxjs/toolkit';
import { fetchFitnessData } from './fitnessActions'; 

const fitnessSlice = createSlice({
  name: 'fitness',
  initialState: {
    data: [],
    loading: true,
    error: null,
  },
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchFitnessData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFitnessData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Saves the formatted data
      })
      .addCase(fetchFitnessData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Saves the error message
      });
  },
});

export default fitnessSlice.reducer;