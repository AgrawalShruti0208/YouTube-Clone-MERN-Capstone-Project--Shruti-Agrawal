import { getVideosData, getVideosByCategory,getCommentsOfVideo } from "../Controllers/videos.controller.js";

function VideosRoutes(app) {

    app.get("/videos",getVideosData);
    app.get("/video/:category",getVideosByCategory);
    app.get("/video/:video_ID/comments",getCommentsOfVideo);
    
}

export default VideosRoutes;