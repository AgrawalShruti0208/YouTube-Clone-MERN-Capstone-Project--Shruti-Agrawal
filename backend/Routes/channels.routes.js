import { addChannel , getVideosFromChannel, getChannels} from "../Controllers/channels.controller.js";

function ChannelRoutes(app) {
    
    // POST method to add channel to the Database
        app.post('/channel',addChannel);

    // FETCH videos from the channel 
        app.get('/channel/:id',getVideosFromChannel)

        app.get('/channels',getChannels)

}

export default ChannelRoutes;