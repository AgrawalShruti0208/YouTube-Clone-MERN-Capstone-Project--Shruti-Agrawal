import React, { useState, useEffect, useRef } from 'react';

function ProfileDropdown({userInfo, handleLogOut}) {

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const username = "John Doe";  // Replace with dynamic username
  const userEmail = "johndoe@example.com";  // Replace with dynamic email

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    handleLogOut();
    setIsOpen(false);  // Close the dropdown after logging out
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {/* Profile Avatar */}
      <div
        onClick={toggleDropdown}
        className="profile-container cursor-pointer bg-gray-200 transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
      >
         
        <img src={userInfo.user_avatar} alt="Profile Picture" className="profile-image" />
         
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <div className="flex flex-col">
            <p className="font-semibold">{userInfo.username}</p>
            <p className="text-sm text-gray-500">{userInfo.email}</p>

            <button
              onClick={handleLogout}
              className="mt-2 text-sm text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;

