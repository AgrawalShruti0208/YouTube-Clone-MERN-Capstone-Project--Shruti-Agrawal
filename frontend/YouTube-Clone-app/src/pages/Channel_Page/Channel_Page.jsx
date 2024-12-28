import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";

import { fetchVideoData } from "../../utils/videoDataSlice.js";
import { fetchChannelData } from '../../utils/channelDataSlice.js';

import ChannelInformation from '../../components/ChannelPageComponents/ChannelInformation.jsx';
import ChannelVideosCollection from '../../components/ChannelPageComponents/ChannelVideosCollection.jsx';


function Channel_Page() {
    const params = useParams();
    const channel_id = params.id;

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    
    const Channeldata = useSelector(state => state.channelList);
    const Videodata = useSelector(state => state.videoList);
    

    useEffect(() => {
        

        function fetchData(){

            if(!Videodata.videos.length){
                dispatch(fetchVideoData());
            }else if(!Channeldata.channels.length){
                dispatch(fetchChannelData());
            }else{
                setLoading(false);
            }

        }
        
        
        if (!Videodata.videos.length || !Channeldata.channels.length) {
            fetchData();
        } else {
            setLoading(false);
        }

    }, [dispatch, Videodata.videos.length, Channeldata.channels.length]);

    if (loading) {
        return <div className='pt-6'>Loading...</div>;
    }

     // Redirect if no data is available
    if (Videodata.videos.length === 0 || Channeldata.channels.length === 0) {
        navigateTo("/"); // Redirect to root route
        return null; // Prevent rendering anything else
    }
    const selected_channel = Channeldata.channels.find(channel => channel._id === channel_id);
    const videoIDs = selected_channel.Videos;
    const selected_video = Videodata.videos.filter(video => videoIDs.includes(video._id));
    
   
    // Redirect if video or channel is not found
    if (!selected_video || !selected_channel) {
        navigateTo("/"); // Redirect to root route
        return null; // Prevent rendering anything else
    }
    

    return ( 
        <div className="Channel_Page pt-4">
            <div className="MainChannelComponent lg:w-[94%] lg:mx-auto">
                    <ChannelInformation channel={selected_channel} />
                    <ChannelVideosCollection videos={selected_video} />
            </div>

        </div>
     );
}

export default Channel_Page;