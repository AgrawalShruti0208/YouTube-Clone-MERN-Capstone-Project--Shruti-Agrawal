import ReactPlayer from 'react-player'

function VideoPlayer(props) {
   
    const videoURL = props.VideoUrl;

    return ( 
        // change size of Video player using this video player div
        <div className="VideoPlayer">
            <div className="videoWrapper">
                <div className='videoWrapper2'>
                    <ReactPlayer 
                        url={videoURL} 
                        controls={true} 
                        width="100%"
                        
                                            
                    />
                </div>
                
            </div>
        </div>
     );
}

export default VideoPlayer;