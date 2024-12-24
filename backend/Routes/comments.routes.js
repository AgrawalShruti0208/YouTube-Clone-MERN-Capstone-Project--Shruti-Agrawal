import { addComment , editComment,deleteComment } from "../Controllers/comments.controller.js";

function CommentsRoutes(app) {
    app.post('/video/:id/comment',addComment);
    app.put("/comments/:id", editComment);
    app.delete("/comments/:id", deleteComment);
}

export default CommentsRoutes;

