import { useState,useEffect } from "react";
import { useCustomFetch } from "../utils/useCustomFetch.js";
import VideoCard from "./VideoCard.jsx";
import { Link } from "react-router-dom";

function DisplayAllVideos() {

    const [Videos_data, setVideosData] = useState([]);

    const FetchVideos_URL = 'http://localhost:3000/videos';

    const {fetchedData,err} = useCustomFetch(FetchVideos_URL);

    useEffect(()=>{
        if(fetchedData){
            setVideosData(fetchedData);
            
        }
    },[fetchedData]);

       

    if(err){ //if err is not null show error message
        console.log("Error : ",err);
    }
    
    if(Videos_data){
        
        
        return ( 
            <div className="DisplayVideos pt-4">
               {Videos_data.map((video)=>{
                        
                        return <Link key={video._id} to={`/Video/${video._id}`}><VideoCard videoData={video}/></Link>
                        
                    
                })}
                    
            </div>
        );

        
    }
    
}

export default DisplayAllVideos;