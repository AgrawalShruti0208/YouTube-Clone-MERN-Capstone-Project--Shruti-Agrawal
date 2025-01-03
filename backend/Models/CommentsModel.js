import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
    { 
        User_ID: {
            type: String,  // Field type is String
            required: false // Optional field, not required 
        },
        User_Avatar: {
            type: String,
            default :"../public/user_default_Avatar.jpg"

        },
        User_Name:{
            type : String,
            required:[true,"User Name required to Add comment"]
        },
        Comment_text:{
            type : String,
            required:[true, "Comment text required to add comment"],
            trim: true,
            minlength: [5,"Comment text should be a valid text"] //add comment with minimum length
        },
        video_ID : String
    },
    { timestamps: true }
)

const CommentsModel = mongoose.model("comments",commentSchema);

export default CommentsModel;