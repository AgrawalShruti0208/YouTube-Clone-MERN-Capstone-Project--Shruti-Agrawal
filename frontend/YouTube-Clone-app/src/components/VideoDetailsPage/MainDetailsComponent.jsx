import { useDispatch, useSelector } from 'react-redux';
import { fetchVideoData } from "../../utils/videoDataSlice.js";
import { fetchChannelData } from '../../utils/channelDataSlice.js';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

// components
import VideoPlayer from './VideoPlayer.jsx';
import VideoInformation from './VideoInformation.jsx';
import VideoChannelInfo from './VideoChannelInfo.jsx';
import CommentsSection from './CommentsSection.jsx';
import DisplayAllVideos from '../DisplayAllVideos.jsx';

function MainDetailsComponent(props) {
    const [breakpoint, setBreakpoint] = useState(null);
    const dispatch = useDispatch();

    const Videodata = useSelector(state => state.videoList);
    const Channeldata = useSelector(state => state.channelList);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigateTo = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchVideoData());
                await dispatch(fetchChannelData());
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch data");
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);

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

    if (error) {
        return <> <div className='pt-6'>{error}</div>;
        {navigateTo("/")}
        </>    
    }

    if (Videodata.videos.length === 0 || Channeldata.channels.length === 0) {
        return <>
        <div className='pt-6'>No data available.</div>;
        {navigateTo("/")}
        </>
        
    }

    const selected_video = Videodata.videos.find(video => video._id === props.videoID);
    const selected_channel = Channeldata.channels.find(channel => channel._id === selected_video.channelId[0]);
   
    if (!selected_video || !selected_channel) {
        return <>
         <div>Video or Channel not found.</div>;
         {navigateTo("/")}
        </>
    }

    return (
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
    );
}

export default MainDetailsComponent;