import mongoose from "mongoose";

const userVideoSchema = mongoose.Schema(
    { 
        videoURL: {
        type: String,
        require:[true,"Add URL of YouTube Video"]
        },
        videoTitle:{
            type : String,
            require:[true,"Add Title of Your Video"]
        },
    }
)

const UserVideoModel = mongoose.model("user_videos",userVideoSchema);

export default UserVideoModel;