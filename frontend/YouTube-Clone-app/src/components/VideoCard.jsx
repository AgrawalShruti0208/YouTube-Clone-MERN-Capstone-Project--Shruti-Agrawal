import { formatDistanceToNowStrict } from "date-fns";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

// Redux Store
import {useDispatch , useSelector} from 'react-redux'
import { fetchChannelData } from "../utils/channelDataSlice.js";

function VideoCard(props) {
    //Receiving all channel data from Redux
    const dispatch = useDispatch();

    const data = useSelector(state => state.channelList);
    

    useEffect(()=>{
        // dispatching action to fetch data from backend API and return the state of request
        dispatch(fetchChannelData())
    },[dispatch]);

    // video data from props and fetching the channel data for the video from redux store
    const video = props.videoData;
    
    
    if(!data.loading && data.channels.length!==0){
        
        let channel = data.channels.filter((channelFilter)=>{
            if(video.channelId[0] === channelFilter._id){
                return channelFilter;
            }
        })

        channel = channel[0];
           
    
       

        const DateDescription = formatDistanceToNowStrict(
            video.videoUpload,
            
            {addSuffix: true}
        )
    

        return (
            <div className="VideoCard">
                
                {!data.loading && 
                        <div className="Card_wrapper">
                            <div className="videoThumbnail">
                                <img src={video.videoThumbnail} alt="Video Thumbnail" />
                            </div>
                            <div className="videoSecondPart">
                                <img src={channel.owner_avatar} alt="Channel_avatar" />
                                <div className="videoDetails">
                                    <h3>{video.videoTitle}</h3>
                                    <div className="smallDetails">
                                        <h2>{channel.channel_name} . {video.videoViews} . {DateDescription}</h2>

                                    </div>
                                </div>
                                
                            </div>
                        </div>
                }
                
                
                
            </div>  
        );
    }
}

export default VideoCard;