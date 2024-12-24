import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserData = createAsyncThunk("fetchUserData", async (userEmail) => {
  const response = await fetch(`http://localhost:3000/user/${userEmail}`);
  return response.json();
});

const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    user: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => { 
    // for maintaining different states of API CALL
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userDataSlice.reducer;