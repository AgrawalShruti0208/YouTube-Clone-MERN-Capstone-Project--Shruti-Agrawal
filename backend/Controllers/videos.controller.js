import { Video_Data } from "../utils/VideoData.js";
import VideosModel from "../Models/VideosModel.js";

export async function getVideosData(req,res){

  
    try{
        
        
        res.send(await VideosModel.find({}));
       
           
    }catch(error){
        //catch => if not successful to fetch data, send error 
        console.log("Error in fetching list of videos:",error.message);
        res.status(500).json({message:"Error in fetching list of videos:"+error.message});
    }
    
}

export async function getVideosByCategory(req,res) {
    const category_asked = req.params.category;
    
    const category = ["All","Music","Comedy","Gaming","Comedy","Travel","Podcasts","Films"];
    
    if(category.includes(category_asked)==true){
        const filterObj = (category_asked ==="All")? {} : {videoCategory : category_asked};
        const data = await VideosModel.find(filterObj);
        res.send(data);
    }else{
        console.log("No videos available for this category!");
        res.status(500).json({message:"No videos available for this category!"});
    }

    
}


