import CommentsModel from "../Models/CommentsModel.js";
import VideosModel from "../Models/VideosModel.js";
import notifier from "node-notifier";

export function addComment(req,res){

    const comment = req.body;

        CommentsModel.create(comment)
        .then(async(savedData) =>{
            
            await VideosModel.findByIdAndUpdate(
                savedData.video_ID,
                { $push: { videoComments: savedData._id } },
                { new: true, useFindAndModify: false }
            );

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
            console.error("Error adding comment:", err);
        });

}

// Edit Comment
export async function editComment(req,res){
    const { id } = req.params;
  const { Comment_text } = req.body;

  

  if (!Comment_text) {
    return res.status(400).json({ message: "Comment text is required" });
  }

  try {
    const updatedComment = await CommentsModel.findByIdAndUpdate(
      id,
      { Comment_text },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json(updatedComment);
  } catch (err) {
    console.error("Error updating comment:", err);
    res.status(500).json({ message: "Failed to update comment" });
  }
};

//Delete Comment
export async function deleteComment(req, res){
    const { id } = req.params;

  

  try {
    const deletedComment = await CommentsModel.findByIdAndDelete(id);

    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ message: "Failed to delete comment" });
  }
};