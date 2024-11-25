import MainChannelComponent from "../../components/ChannelPageComponents/MainChannelComponent.jsx";
import { useParams } from "react-router-dom";

function Channel_Page() {
    const params = useParams();
    const channel_id = params.id;

    return ( 
        <div className="Channel_Page pt-4">
            <MainChannelComponent channelID = {channel_id} />
        </div>
     );
}

export default Channel_Page;