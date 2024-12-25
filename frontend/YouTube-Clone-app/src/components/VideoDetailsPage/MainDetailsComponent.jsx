import {useDispatch , useSelector} from 'react-redux'
import { fetchVideoData } from "../../utils/videoDataSlice.js";
import { fetchChannelData } from '../../utils/channelDataSlice.js';
import { useState, useEffect } from "react";

// components
import VideoPlayer from './VideoPlayer.jsx';
import VideoInformation from './VideoInformation.jsx';
import VideoChannelInfo from './VideoChannelInfo.jsx';
import CommentsSection from './CommentsSection.jsx';

import DisplayAllVideos from '../DisplayAllVideos.jsx';

function MainDetailsComponent(props) {
    const [breakpoint, setBreakpoint] = useState(null); 
    const dispatch = useDispatch();

    let selected_video,selected_channel;
    const Videodata =  useSelector(state => state.videoList);
    const Channeldata = useSelector(state => state.channelList);
    
    useEffect(()=>{
        // dispatching action to fetch data from backend API and return the state of request
        dispatch(fetchVideoData());
        dispatch(fetchChannelData());

    },[dispatch]);
    
      useEffect(() => {
        // Define media queries
        
        const splitScreen = window.matchMedia("(min-width: 1017px)");
        
    
        // Function to update the breakpoint state
        const updateBreakpoint = () => {
          
          if (splitScreen.matches) {
            setBreakpoint("split");
          }else{
            setBreakpoint(null);
          } 
    
        };
    
        // Initial call to set the correct breakpoint
        updateBreakpoint();
    
        // Add listeners for breakpoint changes
        splitScreen.addEventListener("change", updateBreakpoint);
    
        // Cleanup listeners on unmount
        return () => {
          splitScreen.removeEventListener("change", updateBreakpoint);
        };
      }, []);
    
    

    if(Videodata.videos.length!=0){
        selected_video = Videodata.videos.filter((video)=>{
            if(video._id === props.videoID){
                return video;
            }
        })
    
       while(Channeldata.channels.length==0){
            continue;
            
       }
        
       
       const ID = selected_video[0].channelId[0];
       if(Channeldata.channels.length!=0){
            selected_channel = Channeldata.channels.filter((channel)=>{
                if(channel._id== ID){
                    return channel;
                }
            })
       
       
            console.log(selected_channel);

    
            
            return ( 
                <div className={`${
                    breakpoint === "split"
                      ? "grid grid-cols-[68%_28%] mx-auto w-[96%] gap-4 pt-6 custom-lgDesktop:w-[100%] custom-lgDesktop:grid-cols-[70%_25%] custom-lgDesktop:gap-1"
                      : "pt-6"
                  }`}>
                    <div className="MainDetailsComponent pt-4 px-[1px] custom-small:pr-[10px] custom-small:ml-[10px] custom-mid:pr-[1.2rem] custom-mid:ml-5">
                        
                        <VideoPlayer videoID={selected_video[0].videoURL} />
                        <div className='Information_Section p-4 relative'>
                            <VideoInformation ChannelData ={selected_channel} VideoData ={selected_video} />
                        </div>
                        <VideoChannelInfo ChannelData ={selected_channel} VideoData ={selected_video} />
                        <CommentsSection videoId={selected_video[0]._id} />
                    
                    </div>
                
                    {breakpoint=="split" && (
                        <div className='SplitVideoDisplay'>
                            <DisplayAllVideos display = {"split"} />
                        </div> 
                              
                    )}

                </div>
                
            );
        }
    }
}

export default MainDetailsComponent;