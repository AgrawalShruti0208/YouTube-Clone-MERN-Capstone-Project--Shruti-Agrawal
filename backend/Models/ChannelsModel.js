//importing mongoose
import mongoose from "mongoose";



// To create Schema for Channel Collection
const channelSchema = mongoose.Schema({
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
    description: String,
    banner:{
        type: String,
        default:"./public/Youtube_Channel_Demo_Banner.png"
    },
    subscribers: {
        type: Number,
        default: (Math.random()*1000).toFixed(0)
    },
    Videos:
    { 
        // Array of ObjectIDs of all the videos user saved inside another collection 'user_videos'
            type: [mongoose.Schema.Types.ObjectId], 
            ref: 'user_videos', 
            default: [new mongoose.Types.ObjectId('673f581acf4dd2a039efcaf7')]
            
    }
    

},{strictPopulate: false});

const ChannelsModel = mongoose.model("channels",channelSchema);
export default ChannelsModel;