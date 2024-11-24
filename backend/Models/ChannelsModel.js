//importing mongoose
import mongoose from "mongoose";

// To create Schema for Channel Collection
const channelSchema = mongoose.Schema({
    _id: String,
    channel_name: {
        type: String,
        required: [true,"Please enter your Channel Name!"],
        cast:false,
    },
    channel_owner:{
        type: String,
        required: [true,"Please enter your Name!"],
        cast:false,
    },
    owner_avatar: {
        type: String,
        default: "../public/user_default_Avatar.jpg"
    },
    description: String,
    banner:{
        type: String,
    },
    subscribers: {
        type: String,
    },
    Videos:
    { 
        // Array of ObjectIDs of all the videos user saved inside another collection 'user_videos'
            type: [String],
            default: ["video13","video14","video15"] //demo videos 
            
    }
    

},{strictPopulate: false});

const ChannelsModel = mongoose.model("channels",channelSchema);


 

export default ChannelsModel;