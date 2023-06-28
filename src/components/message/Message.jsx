import React from "react";
import "./message.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function Message({ user, message }) {
  const messageClasses = user === "you" ? "to-right background-green" : "to-left background-white";

  return (
    <div className={messageClasses + " single-message-container"}>
        <span className="message-container">{message}</span>
    </div>
  );
}

export default Message;
