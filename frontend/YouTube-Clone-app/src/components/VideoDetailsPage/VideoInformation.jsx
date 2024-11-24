import { formatDistanceToNowStrict } from "date-fns";

function VideoInformation(props) {
    const channel = props.ChannelData[0];
    const video = props.VideoData[0];

    const DateDescription = formatDistanceToNowStrict(
        video.videoUpload,
        
        {addSuffix: true}
    )
    
    return ( 
        <div className="VideoInformation">
            <div className="smallInfo">
                
                <h2 className="text-[1.2rem] font-medium">{video.videoTitle}</h2>
                <h4><span className="text-gray-700 text-xm">{video.videoViews} . {DateDescription}</span>  ...more</h4>
            </div>

        </div>
     );
}

export default VideoInformation;