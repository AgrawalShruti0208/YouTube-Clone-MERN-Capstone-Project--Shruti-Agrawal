import mongoose from 'mongoose'

const videoSchema = mongoose.Schema({
    // Static data therefore no validations required, Only Get/update calls

    videoTitle: String,
    videoThumbnail: String,
    videoDescription : String,
    channelId : String,
    videoUploader: String,
    videoViews: Number,
    videoLikes: Number,
    videoDislikes : Number,
    videoUpload: Date,
    videoComments : {
        // Array of ObjectIDs of all the comments user saved inside another collection 'comments'
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'comments'
    }
    
});

    const VideosModel = mongoose.model("videos",videoSchema);

export default VideosModel;