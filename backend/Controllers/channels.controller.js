import ChannelsModel from "../Models/ChannelsModel.js";



export async function getChannels(req,res){
    try{
        
        
        res.send(await ChannelsModel.find({}));
       
           
    }catch(error){
        //catch => if not successful to fetch data, send error 
        console.log("Error in fetching list of videos:",error.message);
        res.status(500).json({message:"Error in fetching list of videos:"+error.message});
    }
}