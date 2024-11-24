import { getVideosData, getVideosByCategory } from "../Controllers/videos.controller.js";

function VideosRoutes(app) {

    app.get("/videos",getVideosData);
    app.get("/video/:category",getVideosByCategory);
    
}

export default VideosRoutes;