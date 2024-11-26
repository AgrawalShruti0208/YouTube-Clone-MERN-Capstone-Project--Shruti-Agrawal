import { useState } from "react";
import { Link } from "react-router-dom";
function VideoChannelInfo(props) {
    const [subscribeStatus,setSubscribeStatus] = useState("Subscribe");
    const [LikeStatus,setLikeStatus] = useState(false);
    const [DisLikeStatus,setDisLikeStatus] = useState(false);


    const channel = props.ChannelData[0];
    const video = props.VideoData[0];
    const [numberOfLikes, setNumberOfLikes] = useState(video.videoLikes)

    
        function toggleLikeBtn(){
            setLikeStatus(true);
            setDisLikeStatus(false);
            setNumberOfLikes(numberOfLikes+1)
        }

        function toggleDisLikeBtn(){
            setLikeStatus(false);
            setDisLikeStatus(true);
            setNumberOfLikes(numberOfLikes-1)
        }
        
        
        function toggleSubscription(){
            setSubscribeStatus((subscribeStatus ==="Subscribe")?"Unsubscribe":"Subscribe");
            
        }
    
    return ( 
        <div className="VideoChannelInformation mr-2 mt-[-5px]">
           <div className="line3 flex items-center justify-between w-[100%] ">
                <Link to={`/Channel/${channel._id}`} className="w-[65%]">
                    <div className="channelPart flex items-center gap-3 px-2 text-[0.9rem] w-[100%]">
                        <img src={channel.owner_avatar} alt="Channel_avatar" />
                        <h5>{channel.channel_name}</h5>
                        <h5 className="text-gray-700 text-[0.8rem]">{channel.subscribers.split(" ")[0]}</h5>
                    </div>
                </Link>
                
                <button className="subscribeBtn w-[35%] p-2 px-3 rounded-3xl bg-black text-white" onClick={toggleSubscription}>{subscribeStatus}</button>
           </div>
           <div className="line4 mt-5 px-1 flex gap-1">
                <div className="likeDislike flex gap-3 bg-[#eaeaea] px-3 py-2 rounded-full">
                    <div className="likeBtn flex gap-2">
                        <button onClick={toggleLikeBtn}>
                            {(LikeStatus===true) ? <i className='bx bxs-like bx-burst bx-sm' ></i> : <i className='bx bx-like bx-tada-hover bx-sm'></i>}
                        </button>
                        <div className="text-[1.1rem] font-medium">{numberOfLikes}</div>
                    </div>
                    <h6 className="text-gray-400">|</h6>
                    <div className="dislikeBtn">
                        <button onClick={toggleDisLikeBtn}>
                                {(DisLikeStatus===true) ? <i className='bx bxs-dislike bx-burst bx-sm' ></i> :<i className='bx bx-dislike bx-tada-hover bx-sm'></i> }
                        </button>
                    </div>
                </div>
                <div className="shareBtn flex gap-1 items-center justify-start bg-[#eaeaea] px-4 py-1 rounded-full">
                    <button><i className='bx bx-share bx-flip-horizontal bx-flashing-hover bx-sm'></i></button>
                    <div className="text-[1.1rem]">Share</div>
                </div>
                <div className="saveBtn flex gap-1 items-center justify-start bg-[#eaeaea] px-4 py-1 rounded-full">
                    <button><i className='bx bx-bookmark bx-tada-hover bx-sm'></i></button>
                    <div className="text-[1.1rem]">Save</div>
                </div>
            </div>  
          
        </div>
     );
}

export default VideoChannelInfo;