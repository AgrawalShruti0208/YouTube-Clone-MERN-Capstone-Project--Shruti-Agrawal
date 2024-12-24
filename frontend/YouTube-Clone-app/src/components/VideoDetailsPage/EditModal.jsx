import { useState,useEffect } from "react";

const EditModal = ({ isOpen, onClose, commentText, onSave }) => {
    const [newText, setNewText] = useState(commentText);
  
    // Update the state when the modal opens with a new comment
    useEffect(() => {
      setNewText(commentText);
    }, [commentText]);
  
    const handleSave = () => {
      onSave(newText);
      onClose();
    };
  
    return (
      <div className={`modal ${isOpen ? "open" : ""}`} onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2>Edit Comment</h2>
          <br />
          <hr />
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="edit-comment-input"
          />
          <div className="modal-buttons flex gap-3">
            <button className="cancel-btn" onClick={onClose}>Cancel</button>
            <button className="submit-btn" onClick={handleSave}>Save</button>
            
          </div>
        </div>
      </div>
    );
};
  

export default EditModal;