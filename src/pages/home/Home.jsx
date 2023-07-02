import React, { useEffect } from "react";
import "./home.css";

import ChatsList from "../chats-list/Chats-list";
import ChatContent from "../chat-content/Chat-content";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserInfoFromLocal } from "../../services/localStorage";

function Home() {

  // const userInfo = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  const checkUserLogin = () => {
    const local = JSON.parse(getUserInfoFromLocal());
    if(!(local && local.login)){
      navigate('/login')
    }
  }

  useEffect(() => {
    checkUserLogin()
  }, [])

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
