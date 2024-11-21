import { addComment } from "../Controllers/comments.controller.js";

function CommentsRoutes(app) {
    app.post('/video/:id/comment',addComment);
}

export default CommentsRoutes;