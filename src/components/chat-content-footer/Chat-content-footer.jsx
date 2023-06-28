import React from 'react';
import './chat-content-footer.css';

import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import AttachFileIcon from "@mui/icons-material/AttachFile";

function ChatContentFooter() {
  return (
    <div className="chat-content-footer">
        <div className="chat-content-footer-items">
          <span className="chat-content-footer-smile-icon icon">
            <SentimentSatisfiedAltIcon />
          </span>
          <span className="chat-content-footer-attachment-icon icon">
            <AttachFileIcon />
          </span>
          <div className="chat-content-footer-input-message-container">
            <input
              type="text"
              placeholder="type a message"
              className="chat-content-footer-input-message"
            />
          </div>
          <span className="chat-content-footer-voice-icon icon">
            <KeyboardVoiceIcon />
          </span>
        </div>
      </div>
  )
}

export default ChatContentFooter