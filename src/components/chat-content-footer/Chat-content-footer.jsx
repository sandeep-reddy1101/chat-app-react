import React, { useEffect } from "react";
import "./chat-content-footer.css";

import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import { getSocket, sendMessageThroughSocket } from "../../services/socket";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../store";

function ChatContentFooter() {
  const userId = useSelector(state => state.user.value.userId);
  const chat = useSelector(state => state.chat.value);
  const dispatch = useDispatch();
  const socket = getSocket();
    
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    let message = document.getElementById("message-text");
    const messageData = {
      userId: userId,
      friendPhoneNo: chat.friendPhoneNo,
      friendUserId: chat.friendUserId,
      message: message.value
    }
    dispatch(addMessage({user: 'you',message: message.value, time:new Date().getTime()}));
    sendMessageThroughSocket(messageData);
    message.value = "";
  };

  useEffect(() => {
    socket.on("message", (data) => {
      console.log(data)
    })
  }, [socket]);


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
