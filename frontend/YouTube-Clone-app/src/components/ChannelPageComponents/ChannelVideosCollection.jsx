import ChannelVideosCard from "./ChannelVideosCard.jsx";
import { Link } from "react-router-dom";

function ChannelVideosCollection(props) {
    
    return ( 
        <div className="ChannelVideosCollection m-5 mt-0 w-[95%]">
            <div className="videoHeading p-4 pb-0 mt-2 h-14 custom-mid:mt-0 custom-mid:pt-0 custom-mid:h-10">
                <span className="heading text-lg font-semibold">Videos</span>
            </div>
            <div className="videoSection p-3 custom-mid:pt-0">
                {props.videos.map((video)=>{
                    return <Link key={video._id} to={`/Video/${video._id}`}><ChannelVideosCard videoData={video}/></Link>
                    
                })}
            </div>
            
        </div> 
    );
}

export default ChannelVideosCollection;