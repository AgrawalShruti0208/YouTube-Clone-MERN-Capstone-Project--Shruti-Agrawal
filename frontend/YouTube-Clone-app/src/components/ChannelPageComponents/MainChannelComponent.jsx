import {useDispatch , useSelector} from 'react-redux'
import { useEffect } from "react";

import { fetchVideoData } from "../../utils/videoDataSlice.js";
import { fetchChannelData } from '../../utils/channelDataSlice.js';

import ChannelInformation from './ChannelInformation.jsx';
import ChannelVideosCollection from './ChannelVideosCollection.jsx';

function MainChannelComponent(props) {
    const dispatch = useDispatch();

    
    let selected_videos,selected_channel;
    const Channeldata = useSelector(state => state.channelList);
    
    const Videodata =  useSelector(state => state.videoList);
    
    useEffect(()=>{
        // dispatching action to fetch data from backend API and return the state of request
        dispatch(fetchChannelData());
        dispatch(fetchVideoData());
        

    },[dispatch]);

    if(Channeldata.channels.length!=0){
        selected_channel = Channeldata.channels.filter((channel)=>{
            if(channel._id== props.channelID){
                return channel;
            }
        })
        
       const videoIDs = selected_channel[0].Videos;
       console.log("SELECTED CHANNEL:",selected_channel);
       console.log("VIDEO IDs:",videoIDs);
    
       while(Videodata.videos.length==0){
            continue;
            
       }
        
       
       
       if(Videodata.videos.length!=0){
            selected_videos = Videodata.videos.filter((video)=>{
                if(videoIDs.includes(video._id)){
                    return video;
                }
            })
       
       
       
       console.log(selected_videos);

   
        
        return ( 
            <div className="MainChannelComponent">
                <ChannelInformation channel={selected_channel[0]} />
                <ChannelVideosCollection videos={selected_videos} />
                
            </div>
        );
        }
      
    }
}

export default MainChannelComponent;