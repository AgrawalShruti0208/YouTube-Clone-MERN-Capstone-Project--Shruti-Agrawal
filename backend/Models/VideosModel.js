import mongoose from 'mongoose'
import { Video_Data } from "../utils/VideoData.js";

const videoSchema = mongoose.Schema({
    // Static data therefore no validations required, Only Get/update calls
    _id: String,
    videoTitle: String,
    videoURL : String,
    videoThumbnail: String,
    videoDescription : String,
    videoCategory : String,
    channelId : {
        type: [String]
    },
    videoViews: String,
    videoLikes: {
        type: Number,
        default:0
    },
    videoDislikes : {
        type: Number,
        default:0
    },
    videoUpload: Date,
    videoComments : {
        // Array of ObjectIDs of all the comments user saved inside another collection 'comments'
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'comments'
    }
    
});

const VideosModel = mongoose.model("videos",videoSchema);
export default VideosModel;