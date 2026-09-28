// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   value: [],
// };

// const agendaSlice = createSlice({
//   name: "todaysAgenda",
//   initialState,

//   reducers: {
//     addAgenda(state, action) {
//       // With RTK, you can directly mutate the state thanks to Immer!
//      state.value.push(action.payload);
//     },
//   },
// });

// export const { addAgenda } = agendaSlice.actions;

// export default agendaSlice.reducer;


// import { createSlice } from '@reduxjs/toolkit';
// import { fetchAgendas, addAgenda, deleteAgenda,toggleAgendaStatus } from './agendaThunks';

// const agendaSlice = createSlice({
//   name: 'agenda',
//   initialState: {
//     value: [],
//     isLoading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch Layout Cases
//       .addCase(fetchAgendas.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchAgendas.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.value = action.payload;
//       })
//       .addCase(fetchAgendas.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
//       // Add Layout Case
//       .addCase(addAgenda.fulfilled, (state, action) => {
//         state.value.push(action.payload);
//       })
//       // Delete Layout Case
//       .addCase(deleteAgenda.fulfilled, (state, action) => {
//         state.value = state.value.filter((item) => item._id !== action.payload);
//       })
      
//       .addCase(toggleAgendaStatus.fulfilled, (state, action) => {
  
//        const index = state.value.findIndex((item) => item._id === action.payload._id);
//         if (index !== -1) {
//         // Replace the old item with the updated item (carrying the new completed true/false value)
//            state.value[index] = action.payload;
//   }
// });
//   }
// });



// export default agendaSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';
import { fetchAgendas, addAgenda, deleteAgenda, toggleAgendaStatus } from './agendaThunks';

const agendaSlice = createSlice({
  name: 'agenda',
  initialState: {
    value: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearAgenda: (state) => {
      state.value = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgendas.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAgendas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value = action.payload;
      })
      .addCase(fetchAgendas.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addAgenda.fulfilled, (state, action) => {
        state.value.push(action.payload);
      })
      .addCase(deleteAgenda.fulfilled, (state, action) => {
        state.value = state.value.filter((item) => item._id !== action.payload);
      })
      .addCase(toggleAgendaStatus.fulfilled, (state, action) => {
        const index = state.value.findIndex((item) => item._id === action.payload._id);
        if (index !== -1) {
          state.value[index] = action.payload;
        }
      });
  },
});

export const { clearAgenda } = agendaSlice.actions;
export default agendaSlice.reducer;