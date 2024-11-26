import React, { useEffect, useState } from "react";
// import "./CommentsSection.css"; // Import CSS for styling

const CommentsSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:3000/video/${videoId}/comments`); 
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = await response.json();
        console.log("video",data);
        setComments(data.comments);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [videoId]);

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="comments-section">
      <h3>{comments.length} Comments</h3>
      {comments.map((comment) => (
        <div key={comment._id} className="comment">
          <div className="comment-avatar">
            <img
              src={comment.User_Avatar}
              alt={`${comment.User_Name}'s avatar`}
            />
          </div>
          <div className="comment-body">
            <div className="comment-header">
              <span className="comment-user">{comment.User_Name}</span>
              <span className="comment-timestamp">• {new Date(comment.createdAt).toLocaleString()}</span>
            </div>
            <p className="comment-text">{comment.Comment_text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsSection;
