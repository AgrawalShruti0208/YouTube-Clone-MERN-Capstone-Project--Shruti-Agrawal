import { configureStore } from "@reduxjs/toolkit";
import videoReducer from './videoDataSlice.js'
import channelReducer from './channelDataSlice.js'

export const store = configureStore({
    reducer:{
        videoList : videoReducer,
        channelList : channelReducer
    }
})