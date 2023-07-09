import React, { useEffect } from "react";
import "./home.css";

import ChatsList from "../chats-list/Chats-list";
import ChatContent from "../chat-content/Chat-content";
import { useNavigate } from "react-router-dom";
import { getUserInfoFromLocal } from "../../services/localStorage";
import {listenToAllReceiverMessages, listenToConnect, listenToMappingMessages, listenToSendMessageResponseToContact, mapSocketIds, socket } from "../../services/socket";
import { useDispatch } from "react-redux";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  // Function to check whether the user login and userId is present in the local storage or not
  // If not present it will navigate to login page
  // If present it will send the userId to the server for userId and socketId mapping
  const checkUserLogin = () => {
    const local = JSON.parse(getUserInfoFromLocal());
    if (!(local && local.login)) {
      navigate("/login");
    }else{
      mapSocketIds(local.userId)
    }
  };

  useEffect(() => {
    checkUserLogin();
    listenToConnect();
    listenToMappingMessages();
    listenToSendMessageResponseToContact(dispatch);
    listenToAllReceiverMessages(dispatch)
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
