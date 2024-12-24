import { useState, useEffect } from "react";


function ChannelInformation(props) {
    const [subscriptionStatus, setSubscriptionStatus] = useState("Subscribe");
    const [breakpoint, setBreakpoint] = useState("small"); // Default to "small"
    
      useEffect(() => {
        // Define media queries
        // const largeScreen = window.matchMedia("(min-width: 1024px)");
        const mediumScreen = window.matchMedia("(min-width: 700px)");
        const smallScreen = window.matchMedia("(max-width: 699px)");
    
        // Function to update the breakpoint state
        const updateBreakpoint = () => {
          
          if (mediumScreen.matches) {
            setBreakpoint("medium");
          } else if (smallScreen.matches) {
            setBreakpoint("small");
          }
    
        };
    
        // Initial call to set the correct breakpoint
        updateBreakpoint();
    
        // Add listeners for breakpoint changes
        // largeScreen.addEventListener("change", updateBreakpoint);
        mediumScreen.addEventListener("change", updateBreakpoint);
        smallScreen.addEventListener("change", updateBreakpoint);
    
        // Cleanup listeners on unmount
        return () => {
          // largeScreen.removeEventListener("change", updateBreakpoint);
          mediumScreen.removeEventListener("change", updateBreakpoint);
          smallScreen.removeEventListener("change", updateBreakpoint);
        };
      }, []);
    
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
            {breakpoint=="small" &&(
                <>
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
                </>
            )}
            
            {breakpoint=="medium" && (
                <div className="channelSecondPart flex w-[90%] m-5 mb-0 gap-6">
                    <div className="channelAvatar w-[25%]">
                        <img src={channel.owner_avatar} alt="Avatar of the channel" className="rounded-full w-[100%]" />
                    </div>
                    <div className="channelDetails w-[63%]">
                        <h1 className="text-4xl font-bold">{channel.channel_name}</h1>
                        
                        <div className="minorDetails flex items-center gap-1 text-gray-500  text-sm">
                            <h2 className="text-black  text-base">{channel.channel_owner}</h2>
                            <h3>{`. ${channel.subscribers} . ${channel.Videos.length} videos`}</h3>
                            
                        </div>

                        <p className="text-gray-600 text-[0.9rem] my-2">{channel.description}</p>

                        <div className="SubscribeBtnDiv w-[120px] h-[80px]">
                    
                            <button className="subscribeBtn text-[0.9rem] px-[6px] py-[8px] my-2 w-[100px] h-[45px]" onClick={toggleSubscription}>{subscriptionStatus}</button>
                        </div>
                        
                        
                    </div>

                </div>

            )}
            

        </div>
     );
}

export default ChannelInformation;