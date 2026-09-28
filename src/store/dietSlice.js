import { createSlice } from '@reduxjs/toolkit';
import { fetchUserDiet, generateDiet } from './dietThunks';

const dietSlice = createSlice({
  name: 'diet',
  initialState: {
    plan: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearDiet: (state) => {
      state.plan = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Plan
      .addCase(fetchUserDiet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserDiet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.plan = action.payload;
      })
      .addCase(fetchUserDiet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Generate Plan
      .addCase(generateDiet.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(generateDiet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.plan = action.payload;
      })
      .addCase(generateDiet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDiet } = dietSlice.actions;
export default dietSlice.reducer;