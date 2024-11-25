import {useDispatch , useSelector} from 'react-redux'
import { fetchVideoData } from "../../utils/videoDataSlice.js";
import { fetchChannelData } from '../../utils/channelDataSlice.js';
import { useEffect } from "react";

// components
import VideoPlayer from './VideoPlayer.jsx';
import VideoInformation from './VideoInformation.jsx';
import VideoChannelInfo from './VideoChannelInfo.jsx';

function MainDetailsComponent(props) {
    
    const dispatch = useDispatch();

    
    let selected_video,selected_channel;
    const Videodata =  useSelector(state => state.videoList);
    const Channeldata = useSelector(state => state.channelList);
    
    useEffect(()=>{
        // dispatching action to fetch data from backend API and return the state of request
        dispatch(fetchVideoData());
        dispatch(fetchChannelData());

    },[dispatch]);

    if(Videodata.videos.length!=0){
        selected_video = Videodata.videos.filter((video)=>{
            if(video._id === props.videoID){
                return video;
            }
        })
    
       while(Channeldata.channels.length==0){
            continue;
            
       }
        
       console.log(selected_video);
       const ID = selected_video[0].channelId[0];
       if(Channeldata.channels.length!=0){
            selected_channel = Channeldata.channels.filter((channel)=>{
                if(channel._id== ID){
                    return channel;
                }
            })
       
       
       console.log(selected_channel);

   
        
        return ( 
            <div className="MainDetailsComponent">
                <VideoPlayer VideoUrl={selected_video[0].videoURL} />
                <div className='Information_Section p-4 relative'>
                    <VideoInformation ChannelData ={selected_channel} VideoData ={selected_video} />
                </div>
                <VideoChannelInfo ChannelData ={selected_channel} VideoData ={selected_video} />
                
            </div>
        );
        }
    }
}

export default MainDetailsComponent;