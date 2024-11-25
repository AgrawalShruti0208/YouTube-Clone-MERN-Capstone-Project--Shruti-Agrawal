import { useState } from "react";


function ChannelInformation(props) {
    const [subscriptionStatus, setSubscriptionStatus] = useState("Subscribe");
    
    const channel = props.channel;
    function toggleSubscription(){
        setSubscriptionStatus((subscriptionStatus ==="Subscribe") ? "Unsubscribe" : "Subscribe");
    }

    return ( 
        <div className="channelInformation">
            <div className="channel_banner flex justify-center items-center">
                <div className="banner_wrapper w-[92%]">
                    <img src={channel.banner} alt="Banner of the Channel" width={"100%"} className="rounded-lg" />
                </div>
            </div>

            <div className="ChannelData flex w-[100%] justify-center gap-5 items-center p-4 pt-3">
                <div className="channelAvatar w-[27%]">
                    <img src={channel.owner_avatar} alt="Avatar of the channel" className="rounded-full w-[100%]" />
                </div>
                <div className="channelDetails w-[63%]">
                    <h1 className="text-2xl font-extrabold">{channel.channel_name}</h1>
                    <h2 className="text-gray-600  text-base">{channel.channel_owner}</h2>
                    <div className="minorDetails flex gap-1 text-gray-500  text-sm">
                        <h3>{channel.subscribers}</h3>
                        <h3>.</h3>
                        <h3>{channel.Videos.length} videos</h3>
                    </div>
                    
                </div>
            </div>

            <div className="channelDescription flex w-[95%] justify-center items-center px-5 py-6 pt-4 ">
                <p className="text-gray-700 text-[1rem]">{channel.description}</p>
            </div>

            <div className="SubscribeBtnDiv flex items-center justify-center">
                
                <button className="subscribeBtn" onClick={toggleSubscription}>{subscriptionStatus}</button>
            </div>

        </div>
     );
}

export default ChannelInformation;