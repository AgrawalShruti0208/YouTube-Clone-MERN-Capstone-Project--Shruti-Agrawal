import { formatDistanceToNowStrict, format } from "date-fns";

function VideoInformation(props) {
    const channel = props.ChannelData;
    const video = props.VideoData;

    const DateDescription = formatDistanceToNowStrict(
        video.videoUpload,
        
        {addSuffix: true}
    )

    const FormatDateYear = format(video.videoUpload,"yyyy");
    const FormatDateDay = format(video.videoUpload,"MMM dd");

       const InfoDiv = document.querySelector('.InformationPopUp');
        

        function handleDivClick(){
            if(InfoDiv.classList.contains("hideComponent")){
                InfoDiv.classList.replace("hideComponent","showComponent");
            }  
        }
        
        function handleClick(){
            if(InfoDiv.classList.contains("showComponent")){
                InfoDiv.classList.replace("showComponent","hideComponent");
              }
        }
    
    return ( 
        <div className="VideoInformation">
            <div className="smallInfo">
                
                <h2 className="text-[1.2rem] custom-mid:text-[1.1rem] font-medium">{video.videoTitle}</h2>
                <h4 className="custom-mid:text-[0.83rem]">
                    <span className="text-gray-700 text-sm">{video.videoViews} . {DateDescription}</span>
                    <button onClick={handleDivClick}> ...more</button>  
                </h4>

            </div>
            <div className="InformationPopUp z-[500] bg-white text-black absolute top-0 left-0 w-[100%] hideComponent">
                <div className="InfoHeader flex justify-between p-3 mt-4">
                        <h1 className="text-[1.18rem] font-semibold">Description</h1>
                        <button className="crossBtn" onClick={handleClick}>
                            <i className='bx bx-x' ></i>
                        </button>
                </div>

                <div className="InfoWrapper flex flex-col items-center p-2">
                    
                    <h2 className="text-[1.2rem] font-semibold px-2">{video.videoTitle}</h2>
                    <div className="lineDiv1 flex p-3 pb-1 justify-between w-[80%] items-center">
                        <h4><span className="text-2xl font-semibold">{video.videoLikes}</span></h4>
                        <h4 className="text-lg font-semibold"><span className="text-2xl">{video.videoViews.split(" ")[0]}</span>   {video.videoViews.split(" ")[1]}</h4>
                        <h4 className="text-2xl font-semibold">{FormatDateYear}</h4>
                    </div>
                    <div className="lineDiv2 flex px-3 justify-between w-[80%] items-center text-gray-600 font-medium">
                        <h5>Likes</h5>
                        <h5>{video.videoViews.split(" ")[2]}</h5>
                        <h5>{FormatDateDay}</h5>
                    </div>
                    <div className="videoDescription m-4 mt-5 font-medium">{video.videoDescription}</div>
                </div>
            </div>


        </div>
     );
}

export default VideoInformation;