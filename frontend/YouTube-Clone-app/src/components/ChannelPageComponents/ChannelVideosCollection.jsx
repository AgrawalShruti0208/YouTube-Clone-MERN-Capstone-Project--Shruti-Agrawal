import ChannelVideosCard from "./ChannelVideosCard.jsx";
import { Link } from "react-router-dom";

function ChannelVideosCollection(props) {
    
    return ( 
        <div className="ChannelVideosCollection">
            <div className="videoHeading p-4 pb-0 mt-2 h-14">
                <span className="heading text-lg font-semibold">Videos</span>
            </div>
            <div className="videoSection p-3">
                {props.videos.map((video)=>{
                    return <Link key={video._id} to={`/Video/${video._id}`}><ChannelVideosCard videoData={video}/></Link>
                    
                })}
            </div>
            
        </div> 
    );
}

export default ChannelVideosCollection;