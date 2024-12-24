import React, { useState } from 'react';

const OriginalModal = ({ isOpen, onClose, onEditClick, onDelete }) => {
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  
  const handleDelete = () => {
    onDelete();  // Perform delete action
    setShowDeleteMessage(true);  // Show delete confirmation
    setTimeout(() => {
      setShowDeleteMessage(false);  // Hide delete confirmation after 2 seconds
    }, 2000);
    onClose();  // Close modal
  };

  return (
    <>
      <div className={`modal ${isOpen ? 'open' : ''}`} onClick={onClose}>
        <div className="modal-content flex flex-col w-[95%] items-start gap-2" onClick={(e) => e.stopPropagation()}>
          <div className="modalHeader flex w-[95%] justify-between p-1 items-center">
            <h2>Comment</h2>
            <button onClick={onClose}><i className='bx bxs-x-circle' style={{ fontSize: '32px',color: '#494949' }}  ></i></button>
          </div>
          
          <hr />
          <button onClick={onEditClick}><i className='bx bx-pencil' ></i><span className='modalText'>Edit</span></button>
          <button><i className='bx bx-share bx-flip-horizontal' ></i><span className='modalText'>Share</span></button>
          <button onClick={handleDelete}><span className="material-symbols-outlined">delete</span><span className='modalText'>Delete</span></button>
          <button><i className='bx bx-bookmark'></i><span className='modalText'>Save</span></button>
          
        </div>
      </div>
      {/* Delete confirmation message */}
      {showDeleteMessage && (
          <div className="delete-message">Comment Deleted</div>
      )}
    </>
  );
};

export default OriginalModal;