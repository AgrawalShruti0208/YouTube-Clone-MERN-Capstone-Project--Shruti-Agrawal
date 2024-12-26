import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchChannelData = createAsyncThunk( "fetchChannelData", async () => {
  const response = await fetch('https://youtube-clone-mern-capstone-project.onrender.com/channels');
  return response.json();
});

const channelDataSlice = createSlice({
  name: 'channelList',
  initialState: {
    channels: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => { 
    // for maintaining different states of API CALL
    builder
      .addCase(fetchChannelData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChannelData.fulfilled, (state, action) => {
        state.loading = false;
        state.channels = action.payload;
      })
      .addCase(fetchChannelData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default channelDataSlice.reducer;