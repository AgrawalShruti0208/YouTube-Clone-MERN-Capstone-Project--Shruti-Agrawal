import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../utils/userDataSlice.js";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns"; // Importing date-fns

import OriginalModal from "./OriginalModal.jsx";
import EditModal from "./EditModal.jsx";


const CommentsSection = ({ videoId }) => {
  const [comments, setComments] = useState([]); // Store comments
  const [commentText, setCommentText] = useState(""); // Store comment input text
  const [loading, setLoading] = useState(true); // Loading state
  const [errorMessage, setErrorMessage] = useState(""); // Error state for displaying errors
  
  const [isOriginalModalOpen, setIsOriginalModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCommentId, setCurrentCommentId] = useState(null);
  const [currentCommentText, setCurrentCommentText] = useState("");


  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const Userdata = useSelector((state) => state.userData);

  // Fetch user data on component load
  useEffect(() => {
    if (localStorage.getItem("userEmail")) {
      dispatch(fetchUserData(localStorage.getItem("userEmail")));
    }
  }, [dispatch]);

  // Extract user info
  let userInfo = Userdata.user.length ? Userdata.user[0] : undefined;

  // Fetch comments for the video
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`https://youtube-clone-mern-capstone-project.onrender.com/video/${videoId}/comments`);
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = await response.json();
        
        setComments(data.comments.filter(comment => comment !== null));
      } catch (err) {
        console.error("Error fetching comments:", err.message);
        setErrorMessage("Failed to load comments. Please try again.");
      } finally {
        setLoading(false);
        setCurrentCommentId(null);
        setCurrentCommentText("");
      }
    };

    fetchComments();
  }, [videoId]);

  const handleOriginalModalToggle = (comment) => {
    setCurrentCommentId(comment._id);
    setCurrentCommentText(comment.Comment_text);
    setIsOriginalModalOpen(true);
  };

  
  const handleDeleteComment = async () => {
    try {
      
      const response = await fetch(`https://youtube-clone-mern-capstone-project.onrender.com/comments/${currentCommentId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete comment");

      // Remove comment from UI after successful deletion
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== currentCommentId)
      );
    } catch (err) {
      console.error("Error deleting comment:", err);
    }; 
  };


  const handleEditComment = async (newText) => {
    try {
     
      const response = await fetch(`https://youtube-clone-mern-capstone-project.onrender.com/comments/${currentCommentId}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Comment_text: newText }),
      });

      if (!response.ok) throw new Error("Failed to edit comment");

      const updatedComment = await response.json();

      // Update comment in UI after successful edit
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === currentCommentId ? updatedComment : comment
        )
      );
    } catch (err) {
      console.error("Error editing comment:", err);
    };
  };


  // Function to handle the cancel button
  const handleCancelButton = () => {
    setCommentText(""); // Clear the input field
    setErrorMessage(""); // Clear error message
  };

  // Function to handle comment submission
  const handleSubmitButton = async () => {
    const trimmedComment = commentText.trim();

    if (!trimmedComment) {
      setErrorMessage("Comment cannot be empty!"); // Show error message
      return;
    }

    const newComment = {
      User_ID : userInfo._id,
      User_Avatar: userInfo.user_avatar,
      User_Name: userInfo.username,
      Comment_text: trimmedComment,
      video_ID: videoId,
      createdAt: Date.now(), // Use current timestamp for the new comment
    };

    try {
      const response = await fetch(`https://youtube-clone-mern-capstone-project.onrender.com/video/${videoId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) {
        throw new Error("Failed to send comment to the server.");
      }

      const data = await response.json();
      

      // Update the comments state by adding the new comment to the list
      if (data && data.Comment_text) {
        setComments((prevComments) => [...prevComments, data]);
      }
      
      // Clear the input field and error message
      setCommentText("");
      setErrorMessage("");
    } catch (err) {
      console.error("Error submitting comment:", err.message);
      setErrorMessage("An error occurred while submitting the comment.");
    }
  };

  // Function to handle navigation to sign-up
  const handleCommentNavigation = () => {
    navigateTo("/UserSignUp");
  };

  

  // Function to format date like YouTube's relative time format using date-fns
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    // Check if the date is valid
    if (isNaN(date)) {
      console.error("Invalid date:", timestamp);
      return formatDistanceToNow(Date.now(), { addSuffix: true }); // Return the current time if invalid
    }

    return formatDistanceToNow(date, { addSuffix: true });
  };

  // Check if the component is loading or if there is an error
  if (loading) return <p>Loading comments...</p>;

  return (
    <div className="comments-section">
      <h3 className="pl-2">{comments.length} Comments</h3>

      <div className="add-comment flex flex-col">
        {userInfo === undefined ? (
          <div className="add-comment-section flex w-[95%] pl-2">
            <img
              src="/user_default_Avatar.jpg"
              alt="Default Avatar"
              className="avatar w-[20%] custom-medium:w-[40px]"
            />
            <textarea
              placeholder="Add a comment..."
              className="comment-input w-[80%]"
              id="commentNavigate"
              onClick={handleCommentNavigation}
            ></textarea>
          </div>
        ) : (
          <>
            <div className="add-comment-section flex w-[95%] pl-2">
              <img
                src={userInfo.user_avatar}
                alt="User Avatar"
                className="avatar w-[20%] custom-medium:w-[45px]"
              />
              <textarea
                placeholder="Add a comment..."
                className="comment-input w-[80%]"
                id="commentInput"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              ></textarea>
            </div>

            <div className="comment-buttons" id="commentButtons">
              <button
                className="cancel-btn"
                id="cancelButton"
                onClick={handleCancelButton}
              >
                Cancel
              </button>
              <button
                className="submit-btn"
                id="submitButton"
                onClick={handleSubmitButton}
              >
                Comment
              </button>
            </div>

            {/* Display error message */}
            {errorMessage && (
              <p id="errorMessage" className="error-message text-red-600 showComponent">
                {errorMessage}
              </p>
            )}
          </>
        )}
      </div>

      {comments.map((comment,index) => (
        <div key={comment._id || index} className="comment pl-2">
          <div className="comment-avatar">
            <img
              src={comment.User_Avatar}
              alt={`${comment.User_Name}'s avatar`}
            />
          </div>
          <div className="comment-body">
            <div className="comment-header">
              <span className="comment-user">{comment.User_Name}</span>
              <span className="comment-timestamp">
                • {formatDate(comment.createdAt)} 
              </span>
            </div>
            <div className="flex w-[100%] justify-between pr-5">
              <p className="comment-text">{comment.Comment_text}</p>
              {userInfo && comment.User_ID == userInfo._id && 
                <>
                  <button 
                    className="comment-functionality" onClick={() =>handleOriginalModalToggle(comment)}>
                    <i className='bx bx-dots-vertical-rounded'></i>
                  </button>
                  
                </>
              }
            </div>
          </div>
        </div>
      ))}
      {/* Original Modal */}
      <OriginalModal
        isOpen={isOriginalModalOpen}
        onClose={() => setIsOriginalModalOpen(false)}
        onEditClick={() => {
          setIsOriginalModalOpen(false);
          setIsEditModalOpen(true);
        }}
        onDelete={handleDeleteComment}
      />

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        commentText={currentCommentText}
        onSave={handleEditComment}
      />

    </div>
  );
};

export default CommentsSection;
