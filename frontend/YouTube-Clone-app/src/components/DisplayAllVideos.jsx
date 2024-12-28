import { useState,useEffect } from "react";
import { useCustomFetch } from "../utils/useCustomFetch.js";
import VideoCard from "./VideoCard.jsx";
import { Link } from "react-router-dom";

function DisplayAllVideos(props) {

    

    const [Videos_data, setVideosData] = useState([]);

    const FetchVideos_URL = 'https://youtube-clone-mern-capstone-project.onrender.com/videos';

    const {fetchedData,err,isLoading} = useCustomFetch(FetchVideos_URL);

    useEffect(()=>{
        if(fetchedData){
            setVideosData(fetchedData);
            
        }
    },[fetchedData]);

       

    if(err){ //if err is not null show error message
        console.log("Error : ",err);
    }

    if(isLoading){
        return <div className="pt-6">Loading...</div>;
    }
    
    if(Videos_data){
        
        
        return ( 
            <div className={`DisplayVideos pt-4 custom-medium:mx-3 ${props.display ? '!block' : ''}`}>
               {Videos_data.map((video)=>{
                        
                        return <Link key={video._id} to={`/Video/${video._id}`}><VideoCard videoData={video}/></Link>
                        
                    
                })}
                    
            </div>
        );

        
    }
    
}

export default DisplayAllVideos;