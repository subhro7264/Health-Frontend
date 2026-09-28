// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const BASE_URL='http://localhost:5000/api/agenda/'
// const GET_URL = 'http://localhost:5000/api/agenda/getAgenda';
// const POST_URL = 'http://localhost:5000/api/agenda/postAgenda';
// const DELETE_URL = 'http://localhost:5000/api/agenda/deleteAgenda';
// const TOGGLE_URL = 'http://localhost:5000/api/agenda/toggleAgenda';

// // 1. FETCH ALL AGENDA ITEMS

// // export const fetchAgendas = createAsyncThunk(
// //   'agenda/fetchAgendas',
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const token = localStorage.getItem('token');

// //       if (!token) {
// //         return rejectWithValue('No authentication token found. Please log in.');
// //       }

// //       const response = await axios.get(GET_URL, {
// //         headers: { Authorization: `Bearer ${token}` }
// //       });

// //       return response.data; 
// //     } catch (err) {
// //       console.error('Error fetching agenda:', err);
// //       return rejectWithValue(err.response?.data?.message || 'Failed to fetch agenda data');
// //     }
// //   }
// // );


// export const fetchAgendas = createAsyncThunk(
//   'agenda/fetchAgendas',
//   async (dateString, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('token');
      
//       // Sends dateString down to the updated backend controller
//       const response = await axios.get(`http://localhost:5000/api/agenda/getAgenda?dateString=${dateString}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       return response.data; 
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || 'Failed to sync schedule');
//     }
//   }
// );


// // 2. ADD A NEW AGENDA ITEM
// export const addAgenda = createAsyncThunk(

//   'agenda/addAgenda',
//   async (taskData, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('token');

//       if (!token) {
//         return rejectWithValue('No authentication token found. Please log in.');
//       }

//       // taskData should be an object like { task: "Your text" }
//       const response = await axios.post(POST_URL, taskData, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       return response.data;
//     } catch (err) {
//       console.error('Error adding agenda item:', err);
//       return rejectWithValue(err.response?.data?.message || 'Failed to add agenda item');
//     }
//   }
// );

// // 3. DELETE AN AGENDA ITEM
// export const deleteAgenda = createAsyncThunk(
//   'agenda/deleteAgenda',
//   async (id, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('token');

//       if (!token) {
//         return rejectWithValue('No authentication token found. Please log in.');
//       }

//       await axios.delete(`${DELETE_URL}/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       return id; // Return the ID so your extraReducers can filter it out of the array
//     } catch (err) {
//       console.error('Error deleting agenda item:', err);
//       return rejectWithValue(err.response?.data?.message || 'Failed to delete agenda item');
//     }
//   }
// );


// export const toggleAgendaStatus = createAsyncThunk(
//   'agenda/toggleAgendaStatus',
//   async ({ id, currentStatus }, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) return rejectWithValue('No authentication token found.');

//       // Send the opposite of the current status to toggle it
//       const response = await axios.put(`${TOGGLE_URL}/${id}`, { completed: !currentStatus }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       return response.data; // This returns the updated item object from MongoDB
//     } catch (err) {
//       console.error('Error toggling agenda status:', err);
//       return rejectWithValue(err.response?.data?.message || 'Failed to update task');
//     }
//   }
// );



import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/agenda';

// Helper to grab token and structure headers consistently
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
};

// 1. FETCH AGENDAS (Scoped to authenticated user & optional date)
export const fetchAgendas = createAsyncThunk(
  'agenda/fetchAgendas',
  async (dateString, { rejectWithValue }) => {
    try {
      const config = getAuthHeaders();
      if (!config) return rejectWithValue('No authentication token found. Please log in.');

      // Avoids sending "?dateString=undefined" if no date is passed
      const url = dateString 
        ? `${BASE_URL}/getAgenda?dateString=${dateString}` 
        : `${BASE_URL}/getAgenda`;

      const response = await axios.get(url, config);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to sync schedule');
    }
  }
);

// 2. ADD A NEW AGENDA ITEM
export const addAgenda = createAsyncThunk(
  'agenda/addAgenda',
  async (taskData, { rejectWithValue }) => {
    try {
      const config = getAuthHeaders();
      if (!config) return rejectWithValue('No authentication token found. Please log in.');

      const response = await axios.post(`${BASE_URL}/postAgenda`, taskData, config);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add agenda item');
    }
  }
);

// 3. DELETE AN AGENDA ITEM
export const deleteAgenda = createAsyncThunk(
  'agenda/deleteAgenda',
  async (id, { rejectWithValue }) => {
    try {
      const config = getAuthHeaders();
      if (!config) return rejectWithValue('No authentication token found. Please log in.');

      await axios.delete(`${BASE_URL}/deleteAgenda/${id}`, config);
      return id; // Pass ID to Redux extraReducers to filter out of state
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete agenda item');
    }
  }
);

// 4. TOGGLE TASK COMPLETION STATUS
export const toggleAgendaStatus = createAsyncThunk(
  'agenda/toggleAgendaStatus',
  async ({ id, currentStatus }, { rejectWithValue }) => {
    try {
      const config = getAuthHeaders();
      if (!config) return rejectWithValue('No authentication token found. Please log in.');

      const response = await axios.put(
        `${BASE_URL}/toggleAgenda/${id}`,
        { completed: !currentStatus },
        config
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update task');
    }
  }
);