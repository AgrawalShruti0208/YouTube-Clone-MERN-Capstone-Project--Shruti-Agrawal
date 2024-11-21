import CommentsModel from "../Models/CommentsModel.js";
import notifier from "node-notifier";

export function addComment(req,res){

    const comment = req.body;

        CommentsModel.create(comment)
        .then((savedData) =>{
            res.send(savedData);
            notifier.notify({
                title: 'Success',
                message: 'Comment Added',
                icon: '🛒'
            })
        }).catch((err)=>{
            res.status(500).json([{message:"Failed to Add Comment"},{Error:err}]);
            notifier.notify({
                title: '🚨Request Failed',
                message: 'Comment Not Added',
                icon: '🛒'
            });
        });

}