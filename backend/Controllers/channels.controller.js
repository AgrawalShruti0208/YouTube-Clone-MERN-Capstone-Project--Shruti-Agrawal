import ChannelsModel from "../Models/ChannelsModel.js";
import notifier from 'node-notifier';


// controller function to add Channel to the Database
export function addChannel(req,res){
    
    const channel = req.body;
    
        ChannelsModel.create(channel)
            .then((savedData) =>{
                res.send(savedData);
                notifier.notify({
                    title: 'Success',
                    message: 'Channel Added',
                    icon: '🛒'
                })
            }).catch((err)=>{
                res.status(500).json([{message:"Failed to Add Channel"},{Error:err}]);
                notifier.notify({
                    title: '🚨Request Failed',
                    message: 'Channel Not Added',
                icon: '🛒'
                });
            });
        
    
                    
    
}


// To display videos of the Channel
export function getVideosFromChannel(req,res){
    
    ChannelsModel.findOne({ _id : req.params.id})
    .then(async(data)=>{
        
        if(!data){
            console.log("Something Went Wrong,",err.message);
            return res.status(400).json({message:"Something Went Wrong,"+err.message});
        }

        res.send(data);
    })
    .catch((err)=>{
        //catch => if not successful to fetch data, send error 
        console.log("Error in fetching channel details: ",err.message);
        res.status(500).json({message:"Error in fetching channel details: "+err.message});
    });
       
}

export async function getChannels(req,res){
    try{
        
        
        res.send(await ChannelsModel.find({}));
       
           
    }catch(error){
        //catch => if not successful to fetch data, send error 
        console.log("Error in fetching list of videos:",error.message);
        res.status(500).json({message:"Error in fetching list of videos:"+error.message});
    }
}