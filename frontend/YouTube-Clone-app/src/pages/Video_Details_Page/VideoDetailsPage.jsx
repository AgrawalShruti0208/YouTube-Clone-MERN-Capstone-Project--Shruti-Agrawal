import { useDispatch, useSelector } from 'react-redux';
import { fetchVideoData } from "../../utils/videoDataSlice.js";
import { fetchChannelData } from '../../utils/channelDataSlice.js';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

// components
import VideoPlayer from '../../components/VideoDetailsPage/VideoPlayer.jsx';
import VideoInformation from '../../components/VideoDetailsPage/VideoInformation.jsx';
import VideoChannelInfo from '../../components/VideoDetailsPage/VideoChannelInfo.jsx';
import CommentsSection from '../../components/VideoDetailsPage/CommentsSection.jsx';
import DisplayAllVideos from '../../components/DisplayAllVideos.jsx';
import MainDetailsComponent from '../../components/VideoDetailsPage/MainDetailsComponent.jsx';

const VideoDetailsPage = () => {
    
    const params = useParams();
    const video_id = params.id;

    const [breakpoint, setBreakpoint] = useState(null);
    const dispatch = useDispatch();

    const Videodata = useSelector(state => state.videoList);
    const Channeldata = useSelector(state => state.channelList);
    const [loading, setLoading] = useState(true);
    
    const navigateTo = useNavigate();
    

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

    useEffect(() => {
        const splitScreen = window.matchMedia("(min-width: 1017px)");

        const updateBreakpoint = () => {
            setBreakpoint(splitScreen.matches ? "split" : null);
        };

        updateBreakpoint();
        splitScreen.addEventListener("change", updateBreakpoint);

        return () => {
            splitScreen.removeEventListener("change", updateBreakpoint);
        };
    }, []);

    if (loading) {
        return <div className='pt-6'>Loading...</div>;
    }


    // Redirect if no data is available
    if (Videodata.videos.length === 0 || Channeldata.channels.length === 0) {
        navigateTo("/"); // Redirect to root route
        return null; // Prevent rendering anything else
    }

    const selected_video = Videodata.videos.find(video => video._id === video_id);
    const selected_channel = Channeldata.channels.find(channel => channel._id === selected_video.channelId[0]);
   
    // Redirect if video or channel is not found
    if (!selected_video || !selected_channel) {
        navigateTo("/"); // Redirect to root route
        return null; // Prevent rendering anything else
    }
    

    return ( 
        <>
            <MainDetailsComponent videoID={video_id}/>
            <div className={`${
            breakpoint === "split"
                ? "grid grid-cols-[68%_28%] mx-auto w-[96%] gap-4 pt-6 custom-lgDesktop:w-[100%] custom-lgDesktop:grid-cols-[70%_25%] custom-lgDesktop:gap-1"
                : "pt-6"
        }`}>
            <div className="MainDetailsComponent pt-4 px-[1px] custom-small:pr-[10px] custom-small:ml-[10px] custom-mid:pr-[1.2rem] custom-mid:ml-5">
                <VideoPlayer videoID={selected_video.videoURL} />
                <div className='Information_Section p-4 relative'>
                    <VideoInformation ChannelData={selected_channel} VideoData={selected_video} />
                </div>
                <VideoChannelInfo ChannelData={selected_channel} VideoData={selected_video} />
                <CommentsSection videoId={selected_video._id} />
            </div>

            {breakpoint === "split" && (
                <div className='SplitVideoDisplay'>
                    <DisplayAllVideos display={"split"} />
                </div>
            )}
            
        </div>
        </>
    );
};

export default VideoDetailsPage;




