import React, { useEffect } from "react";
import "./chat-content-footer.css";

import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../store";
import { listenToSendMessageResponseToChat, sendMessageThroughSocketToChat, sendMessageThroughSocketToContact } from "../../services/socket";

function ChatContentFooter() {
  const chat = useSelector(state => state.chat.value);
  const dispatch = useDispatch();
    
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    let message = document.getElementById("message-text");
    const messageData = {
      senderId: chat.senderId,
      receiverId: chat.receiverId,
      message: message.value,
      time: new Date().getTime()
    }
    if(chat.chatId){
      sendMessageThroughSocketToChat(chat.chatId, messageData);
    }else{
      sendMessageThroughSocketToContact(messageData);
    }
    dispatch(addMessage(messageData));
    message.value = "";
    listenToSendMessageResponseToChat(dispatch, messageData)
  };

  useEffect(() => {
    
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
