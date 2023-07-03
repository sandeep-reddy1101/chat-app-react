import React from 'react';
import './chat-content-header.css';

import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";

function ChatContentHeader({imageUrl = "images/user-profile.avif", friendName}) {
  return (
    <div className="chat-content-header">
        <div className="chat-content-user-info-container">
          <img
            src="images/user-profile.avif"
            alt="asf"
            className="chat-content-user-image user-profile-pic"
          />
          <div className="chat-content-header-user-info">
            <p className="chat-content-header-user-name">{friendName}</p>
            <p className="click-here-for-contact-information">
              Click here for contact information
            </p>
          </div>
        </div>
        <div className="chat-content-header-icons">
          <span className='icon'>
            <SearchIcon />
          </span>
          <span className='icon'>
            <MoreVertIcon />
          </span>
        </div>
      </div>
  )
}

export default ChatContentHeader