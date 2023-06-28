import React from "react";
import "./chat-content.css";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import { conversation } from "../../services/conversation";
import Message from "../../components/message/Message";

function ChatContent() {
  console.log(conversation);
  return (
    <div className="chat-content-main-container">
      <div className="chat-content-header">
        <div className="chat-content-user-info-container">
          <img
            src="images/user-profile.avif"
            alt="asf"
            className="chat-content-user-image"
          />
          <div className="chat-content-header-user-info">
            <p className="chat-content-header-user-name">Me</p>
            <p className="click-here-for-contact-information">
              Click here for contact information
            </p>
          </div>
        </div>
        <div className="chat-content-header-icons">
          <span>
            <SearchIcon />
          </span>
          <span>
            <MoreVertIcon />
          </span>
        </div>
      </div>
      <div className="chat-content px-3 ">
        {conversation.map((item, key) => {
          return (
            <div key={key} className="single-message">
              <Message message={item.message} user={item.user}/>
            </div>
          );
        })}
      </div>
      <div className="chat-content-footer">
        <div className="chat-content-footer-items">
          <span className="chat-content-footer-smile-icon">
            <SentimentSatisfiedAltIcon />
          </span>
          <span className="chat-content-footer-attachment-icon">
            <AttachFileIcon />
          </span>
          <div className="chat-content-footer-input-message-container">
            <input
              type="text"
              placeholder="type a message"
              className="chat-content-footer-input-message"
            />
          </div>
          <span className="chat-content-footer-voice-icon">
            <KeyboardVoiceIcon />
          </span>
        </div>
      </div>
    </div>
  );
}

export default ChatContent;
