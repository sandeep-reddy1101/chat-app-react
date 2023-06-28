import React from "react";
import "./message.css";


function Message({ user, message, time }) {
  const messageClasses = user === "you" ? "to-right background-green" : "to-left background-white";
  const messageTime = new Date(time).getHours() + ":" + new Date(time).getMinutes();

  return (
    <div className={messageClasses + " message-container"}>
        <span>{message}</span>
        <span className="message-time">{messageTime}</span>
    </div>
  );
}

export default Message;
