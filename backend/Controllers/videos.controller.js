import { Video_Data } from "../utils/VideoData.js";
import VideosModel from "../Models/VideosModel.js";
import CommentsModel from "../Models/CommentsModel.js";


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

export async function getCommentsOfVideo(req,res){
    const {video_ID} = req.params;
    
    
    
        try {
            const video = await VideosModel.findById(video_ID).populate("comments");
            if (!video) {
              return res.status(404).json({ error: "Video not found" });
            }
            const commentIDs = video.videoComments;
        
            //Then, you loop through commentIDs to find each comment. If you go with this method, it's slightly faster to use Promise.all.

                const commentPromises = commentIDs.map(_id => {
                    return CommentsModel.findOne({ _id })
                })

                const  comments_Uploaded = await Promise.all(commentPromises);
            

            
        
            res.status(200).json({ comments: comments_Uploaded });
          } catch (err) {
            res.status(500).json({ error: "Failed to fetch comments" });
          }


}

export function updateVideoLikes(req,res){
    const {video_ID} = req.params;

    VideosModel.findById(video_ID)
   .then((data)=>{
           
       if(!data){
           console.log("Something Went Wrong,",err.message);
           return res.status(400).json({message:"Something Went Wrong,"+err.message});
       }

       const operationToPerform = req.body.msg; //increase or Decrease Number of Likes

       let setLikes = data.videoLikes;
       let setDisLikes = data.videoDislikes;

       if(operationToPerform === "Like"){
            setLikes +=1;
            setDisLikes -=1;
       }
       if(operationToPerform === "DisLike"){
           
            setDisLikes +=1;
            setLikes -=1;
            
        }

        VideosModel.updateOne({ _id: data._id }, { $set: { videoLikes : setLikes , videoDislikes : setDisLikes} })
        .then(async(item) => {
            const updatedItem = await VideosModel.findById(data._id);
            res.send(["Likes" , updatedItem.videoLikes]);
        });


   })
   .catch((err)=>{
       //catch => if not successful to fetch data, send error 
       console.log("Error in updating the number of Likes:",err.message);
       res.status(500).json({message:"Error in updating the number of Likes:"+err.message});
       
   });
}

