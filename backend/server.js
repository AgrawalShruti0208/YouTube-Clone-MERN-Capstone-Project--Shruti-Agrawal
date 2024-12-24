import express from "express"
import mongoose from "mongoose"


//importing routes function in the server to run all the API routes
import ChannelRoutes from "./Routes/channels.routes.js";
import { UserRoutes } from "./Routes/users.routes.js";
import VideosRoutes from "./Routes/videos.routes.js"
import CommentsRoutes from "./Routes/comments.routes.js"

//Static data to be added to Models 
    import { Video_Data } from "./utils/VideoData.js";
    import VideosModel from "./Models/VideosModel.js";

    import { Channel_Data } from "./utils/ChannelsData.js";
    import ChannelsModel from "./Models/ChannelsModel.js";

    import CommentsModel from "./Models/CommentsModel.js";
    import { Comment_Data } from "./utils/CommentsData.js";

import cors from "cors" //importing 'cors' which is used to run and connect both local servers -for frontend and backend
//CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.


//Node.js body parsing middleware.
//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
//As receiving request body from front-end on button click
import bodyParser from "body-parser";

//creating express application 
const app = new express();


//Connecting mongoose in NodeJS with MongoDB using connection url provided by mongoDB compass/atlas for making a connection
   
    
    // Connection string from MongoDB Atlas
    let url="mongodb+srv://shrutiagrawal155:UKq7gMO6NhTuX2Ft@youtubecloneapp.iyhnb.mongodb.net/YouTubeClone_DB";

    mongoose
    .connect(url)
    .then(async(data)=>{
            console.log("Connection with MongoDB Database Successful!");

            //creating server to run the application on specified port number only when connection with database is successful
            app.listen(3000,()=>{
                console.log("created server to run application on port number 3000");
            });
            

            //Loading Static Data to the Databases

                // Check if videos already exist,if not preload them
                VideosModel.countDocuments()
                .then(async(count) => {
                    if (count === 0) {

                        // Insert preload data if collection is empty
                        const videoDocs = await VideosModel.insertMany(Video_Data);
                        console.log("Inserted videos");
                    }
                });

                // Check if comments already exist,if not preload them
                CommentsModel.countDocuments()
                .then(async(count) => {
                    if (count === 0) {

                        // Insert preload data if collection is empty
                        const commentDocs = await CommentsModel.insertMany(Comment_Data);
                        console.log("Inserted comments");


                        // Update videos to include associated comments
                        for (const comment of commentDocs) {
                            await VideosModel.findByIdAndUpdate(
                            comment.video_ID,
                            { $push: { videoComments: comment._id } },
                            { new: true, useFindAndModify: false }
                            );
                        }
                    
                        console.log("Updated videos with comments");
                            
                        }
                });
                    
                 

                // Check if channels already exist,if not preload them
                ChannelsModel.countDocuments()
                .then(count => {
                    if (count === 0) {
                        // Insert preload data if collection is empty
                        ChannelsModel.insertMany(Channel_Data)
                        .then(() => {
                            console.log('Preloaded Channel data successfully');
                        })
                        .catch(err => {
                            console.error('Error occured while preloading channel data:', err);
                        });
                    }
                });

                
        }
    )
    .catch((error)=>console.log("Connection with MongoDB Database Unsuccessful!\nError:",error));

app.use(express.json()); //Middleware to accept json data from client in the server API
app.use(cors()); //using the middleware cors 
app.use(bodyParser.json());//using body-parser to check and convert request body in proper format

//invoking routes function to run all the API routes
UserRoutes(app);
ChannelRoutes(app);
CommentsRoutes(app);
VideosRoutes(app);