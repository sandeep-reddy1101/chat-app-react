import React, { useEffect } from "react";
import "./home.css";

import ChatsList from "../chats-list/Chats-list";
import ChatContent from "../chat-content/Chat-content";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserInfoFromLocal } from "../../services/localStorage";
import {
  connect,
  getSocket,
} from "../../services/socket";
import { useSelector } from "react-redux";

function Home() {
  const userId = useSelector((state) => state.user.value.userId);
  const navigate = useNavigate();
  const socket = getSocket();

  const checkUserLogin = () => {
    const local = JSON.parse(getUserInfoFromLocal());
    if (!(local && local.login)) {
      navigate("/login");
    }
  };

  useEffect(() => {
    checkUserLogin();
    if (userId) {
      connect(userId);
    }
    socket.on("broadcast", (data) => {
      console.log(data)
    })
    socket.on("connect", () => {
      console.log(socket.id);
    });
  }, [socket]);

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
