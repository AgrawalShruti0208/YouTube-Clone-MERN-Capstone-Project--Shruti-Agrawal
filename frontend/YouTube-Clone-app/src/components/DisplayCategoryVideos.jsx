import { useState, useEffect} from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { useParams, useNavigate } from "react-router-dom"
import VideoCategoryBtns from "./VideoCategoryBtns.jsx";
import VideoCard from "./VideoCard.jsx";

// Redux Store
import {useDispatch , useSelector} from 'react-redux'
import { fetchVideoData } from "../utils/videoDataSlice.js";
import { Link } from "react-router-dom";


const DisplayCategoryVideos=()=>{
    // Receiving all the Video data from Redux
    const dispatch = useDispatch();
    

    const data = useSelector(state => state.videoList);
    

    
    
   
    const dynamic_parameter = useParams(); //Getting Category Parameter from URL
    
    const category_asked = dynamic_parameter.category; //Category from the URL
   
    
   
    
    useEffect(()=>{
        // dispatching action to fetch data from backend API and return the state of request
        dispatch(fetchVideoData())
    },[dispatch]);

      

    const category = ["All","Music","Films","Podcasts","Gaming","Travel","Comedy"];
    let FilteredList = [];
    if(!data.loading){
        if(category.includes(category_asked)){
            if(category_asked==="All"){
                FilteredList = data.videos;
            }else{
                FilteredList = data.videos.filter((video)=>{
                    if(video.videoCategory === category_asked){
                        return video;
                    }
                })
            }


        }
    }
    
    return(
        <div className="DisplayCategoryVideos">
            
            <VideoCategoryBtns />

            {data.loading && <div className="SpinLoader"><ClipLoader /></div>}
            {!data.loading && 
                <div className="VideoSection mt-4">

                    
                    {FilteredList.map((video)=>{
                        
                        return <Link to={`/Video/${video._id}`} key={video._id}><VideoCard videoData={video}/></Link>
                        
                    
                    })}
                    
                
                </div>}

        </div>
    );
    

}

export default DisplayCategoryVideos;