import React from "react";
import "./home.css";

import ChatsList from "../chats-list/Chats-list";
import ChatContent from "../chat-content/Chat-content";

function Home() {
  return (
    <div className="home-container">
      <div className="home-chat-list-container">
        <ChatsList />
      </div>
      <div className="home-chat-content-container">
        <ChatContent />
      </div>
    </div>
  );
}

export default Home;
