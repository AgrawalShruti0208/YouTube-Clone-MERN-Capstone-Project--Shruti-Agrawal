import express from "express"
import mongoose from "mongoose"


//importing routes function in the server to run all the API routes
import ChannelRoutes from "./Routes/channels.routes.js";
import UserRoutes from "./Routes/users.routes.js"
import VideosRoutes from "./Routes/videos.routes.js"
import CommentsRoutes from "./Routes/comments.routes.js"

//Static data to be added to Models 
    import { Video_Data } from "./utils/VideoData.js";
    import VideosModel from "./Models/VideosModel.js";

    import { Channel_Data } from "./utils/ChannelsData.js";
    import ChannelsModel from "./Models/ChannelsModel.js";

import cors from "cors" //importing 'cors' which is used to run and connect both local servers -for frontend and backend
//CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.


//Node.js body parsing middleware.
//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
//As receiving request body from front-end on button click
import bodyParser from "body-parser";

//creating express application 
const app = new express();


//Connecting mongoose in NodeJS with MongoDB using connection url provided by mongoDB compass for making a connection
    //MongoDB Compass String:"mongodb://localhost:27017/ShoppyGlobeApplication"
    //MongoDB Atlas String:"mongodb+srv://shrutiagrawal155:u1OQPQrqjVQc1NqX@shoppyglobeapp.yqohw.mongodb.net/"
    
    // Connection string from MongoDB Atlas
    let url="mongodb+srv://shrutiagrawal155:UKq7gMO6NhTuX2Ft@youtubecloneapp.iyhnb.mongodb.net/YouTubeClone_DB";

    mongoose
    .connect(url)
    .then((data)=>{
            console.log("Connection with MongoDB Database Successful!");

            //creating server to run the application on specified port number only when connection with database is successful
            app.listen(3000,()=>{
                console.log("created server to run application on port number 3000");
            });
            
            //Loading Static Data to the Databases
             // Check if videos already exist,if not preload them
                VideosModel.countDocuments()
                .then(count => {
                    if (count === 0) {
                        // Insert preload data if collection is empty
                        VideosModel.insertMany(Video_Data)
                        .then(() => {
                            console.log('Preloaded Video data successfully');
                        })
                        .catch(err => {
                            console.error('Error occured while preloading video data:', err);
                        });
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
// UserRoutes(app);
ChannelRoutes(app);
CommentsRoutes(app);
VideosRoutes(app);