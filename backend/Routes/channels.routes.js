import { addChannel , addVideoToChannel, getVideosFromChannel} from "../Controllers/channels.controller.js";

function ChannelRoutes(app) {
    //POST method to add video to the channel
        app.post('/channel/:id',addVideoToChannel)

    // POST method to add channel to the Database
        app.post('/channel',addChannel);

    // FETCH videos from the channel user created
        app.get('/channel/:id',getVideosFromChannel)

}

export default ChannelRoutes;