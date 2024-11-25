import { formatDistanceToNowStrict} from "date-fns";

function ChannelVideosCard(props) {
    const video = props.videoData;
    const DateDescription = formatDistanceToNowStrict(
        video.videoUpload,
        
        {addSuffix: true}
    )

    return (  
        <div className="ChannelVideoCard mt-4 flex drop-shadow-xl">
            <div className="firstPart w-[50%]">
                <img src={video.videoThumbnail} className="rounded-xl" alt="" width={"100%"} />
            </div>
            <div className="secondPart w-[50%] pl-3">
                <p className="clipVideoTitle text-[0.95rem]">{video.videoTitle}</p>
                <p className="text-sm text-gray-600">{video.videoViews}</p>
                <p className="text-sm text-gray-600">{DateDescription}</p>


            </div>
        </div>
    );
}

export default ChannelVideosCard;