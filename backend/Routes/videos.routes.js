import { getVideosData,getCommentsOfVideo , updateVideoLikes} from "../Controllers/videos.controller.js";
import {checkUserAuthentication} from "../ProtectRoutesMiddleware/checkUserAuthentication.js";

function VideosRoutes(app) {

    app.get("/videos",getVideosData);
    // app.get("/video/:category",getVideosByCategory);
    app.get("/video/:video_ID/comments",getCommentsOfVideo);
    app.patch("/video/:video_ID/update",checkUserAuthentication, updateVideoLikes );
    
}

export default VideosRoutes;