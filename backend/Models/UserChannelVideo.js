import mongoose from "mongoose";

const userVideoSchema = mongoose.Schema(
    { 
        videoURL: {
            type: String,
            validate: {
               validator: function(v) {

                    return /(?:.+?)?(?:\/v\/|watch\/|\?v=|\&v=|youtu\.be\/|\/v=|^youtu\.be\/|watch\%3Fv\%3D)([a-zA-Z0-9_-]{11})+/.test(v);
               },
               message: props => `${props.value} is not a valid youtube link.`
            },
            required: [true, 'Youtube video link is required.']

        },
        videoTitle:{
            type : String,
            required:[true,"Add Title of Your Video"]
        },
    }
)

const UserVideoModel = mongoose.model("user_videos",userVideoSchema);

export default UserVideoModel;