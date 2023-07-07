import React from "react";
import "./message.css";
import { useSelector } from "react-redux";
import { formatTime } from "../../services/functions";


function Message({ senderId, message, time }) {
  const userId = useSelector(state => state.user.value.userId);
  const messageClasses = senderId === userId ? "to-right background-green" : "to-left background-white";
  // const messageTime = new Date(time).getHours() + ":" + new Date(time).getMinutes();
  const messageTime = formatTime(time)

  return (
    <div className={messageClasses + " message-container"}>
        <span>{message}</span>
        <span className="message-time">{messageTime}</span>
    </div>
  );
}

export default Message;
