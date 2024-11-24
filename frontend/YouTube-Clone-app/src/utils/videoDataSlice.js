import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchVideoData = createAsyncThunk("fetchVideoData", async () => {
  const response = await fetch('http://localhost:3000/videos');
  return response.json();
});

const videoDataSlice = createSlice({
  name: 'videoList',
  initialState: {
    videos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => { 
    // for maintaining different states of API CALL
    builder
      .addCase(fetchVideoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideoData.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchVideoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default videoDataSlice.reducer;