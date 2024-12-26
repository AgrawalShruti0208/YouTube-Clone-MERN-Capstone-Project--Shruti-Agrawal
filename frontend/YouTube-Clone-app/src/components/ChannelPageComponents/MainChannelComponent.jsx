import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";

import { fetchVideoData } from "../../utils/videoDataSlice.js";
import { fetchChannelData } from '../../utils/channelDataSlice.js';

import ChannelInformation from './ChannelInformation.jsx';
import ChannelVideosCollection from './ChannelVideosCollection.jsx';

function MainChannelComponent(props) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const Channeldata = useSelector(state => state.channelList);
    const Videodata = useSelector(state => state.videoList);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchChannelData());
                await dispatch(fetchVideoData());
            } catch (err) {
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    let selected_videos, selected_channel;

    if (Channeldata.channels.length !== 0) {
        selected_channel = Channeldata.channels.find(channel => channel._id === props.channelID);

        if (selected_channel) {
            const videoIDs = selected_channel.Videos;

            selected_videos = Videodata.videos.filter(video => videoIDs.includes(video._id));

            return (
                <div className="MainChannelComponent lg:w-[94%] lg:mx-auto">
                    <ChannelInformation channel={selected_channel} />
                    <ChannelVideosCollection videos={selected_videos} />
                </div>
            );
        }
    }

    return <div>No channel found.</div>;
}

export default MainChannelComponent;