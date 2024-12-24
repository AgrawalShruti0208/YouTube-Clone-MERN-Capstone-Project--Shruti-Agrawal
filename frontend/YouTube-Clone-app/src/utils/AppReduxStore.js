import { configureStore } from "@reduxjs/toolkit";
import videoReducer from './videoDataSlice.js'
import channelReducer from './channelDataSlice.js'
import userReducer from './userDataSlice.js'

export const store = configureStore({
    reducer:{
        videoList : videoReducer,
        channelList : channelReducer,
        userData : userReducer
    }
})