import React from 'react';
import "./chats-list-header.css";

import GroupsIcon from "@mui/icons-material/Groups";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MessageIcon from "@mui/icons-material/Message";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function ChatsListHeader() {
  return (
    <div className="chat-list-header-container">
        <div className="chat-list-header">
            <div className="chat-list-header-image-container">
              <img
                src="images/user-profile.avif"
                alt="user profile"
                className="header-image user-profile-pic"
              />
            </div>
            <div className="chat-list-header-icons">
              <GroupsIcon className='icon'/>
              <DonutLargeIcon className='icon'/>
              <MessageIcon className='icon'/>
              <MoreVertIcon className='icon'/>
            </div>
        </div>
      </div>
  )
}

export default ChatsListHeader