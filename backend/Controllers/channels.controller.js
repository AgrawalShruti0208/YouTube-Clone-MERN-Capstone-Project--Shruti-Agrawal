import ChannelsModel from "../Models/ChannelsModel.js";
import UserVideoModel from "../Models/UserChannelVideo.js";
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

// controller function to add video from the user to the Database
export async function addVideoToChannel(req,res){
    
    const userVideo = req.body;
    
    
        await UserVideoModel.create(userVideo)
            .then(async(savedData) =>{
                const savedVideo = savedData;
                
                // Video saved to its Collection, Now to save this video in Channel
                    // Adding video to channel
                    const channel_id = req.params.id; //getting channel_id

                    const Channel = await ChannelsModel.findOne({ _id : channel_id })
                    Channel.Videos.push(savedData._id)
                    const savedVideoInChannel = await Channel.save()
                    
                    
                res.send([savedData , savedVideoInChannel]);
                notifier.notify({
                    title: 'Success',
                    message: 'Video Added To Channel',
                    icon: '🛒'
                })
            }).catch((err)=>{
                res.status(500).json([{message:"Failed to Add Channel"},{Error:err}]);
                notifier.notify({
                    title: '🚨Request Failed',
                    message: 'Video Not Added To Channel',
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