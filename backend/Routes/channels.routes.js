import {getChannels} from "../Controllers/channels.controller.js";

function ChannelRoutes(app) {
    
    app.get('/channels',getChannels)

}

export default ChannelRoutes;