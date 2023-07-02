import React, { useEffect } from "react";
import "./chat-content-footer.css";

import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import { socket } from "../../services/socket";

function ChatContentFooter() {
    
  const handleKeyPress = (e) => {
    console.log("key pressed", e.key);
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    let message = document.getElementById("message-text").value;
    socket.emit("message", message);
  };

  useEffect(() => {
    socket.on("message", (data) => {
      console.log(data);
    });

  }, []);


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
            onKeyDown={handleKeyPress}
            type="text"
            placeholder="type a message"
            className="chat-content-footer-input-message"
            id="message-text"
          />
        </div>
        <span className="chat-content-footer-voice-icon icon">
          <KeyboardVoiceIcon />
        </span>
      </div>
    </div>
  );
}

export default ChatContentFooter;
