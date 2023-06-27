import React from "react";
import "./chat-info.css";

function ChatInfo({ imageUrl, friendName, lastMessage, lastMessageTime }) {
  return (
    <div className="chat-info-main-container">
      <div className="chat-info-user-profile-pic">
        <img
          src={imageUrl ? imageUrl : "images/user-profile.avif"}
          alt="abc"
          className="chat-list-friend-profile-image"
        />
      </div>
      <div className="chat-info-items">
        <div className="chat-info-item-header">
          <p className="chat-list-friend-name">{friendName}</p>
          <p className="chat-last-message-time">{lastMessageTime}</p>
        </div>
        <div className="chat-info-item-content">
          <p className="chat-last-message">{lastMessage}</p>
        </div>
      </div>
    </div>
  );
}

export default ChatInfo;
