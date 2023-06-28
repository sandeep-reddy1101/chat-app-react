import React from "react";
import "./chats-list.css";
import ChatsListHeader from "../../components/chat-list-header/Chats-list-header";
import ChatsListSearch from "../../components/chat-list-search/Chats-list-search";
import ChatInfo from "../../components/chat-info/Chat-info";

function ChatsList() {
  const singleOne = {
    imageUrl: "",
    name: "xyz",
    lastMessage: "hi how are yoaksjdasdfasdfasdfasdfasdfasdasdfasdffkajsdb",
    lastMessageTime: "11:30pm",
  };

  const friendsList = [
    {
      imageUrl: "",
      name: "abc",
      lastMessage: "hi how are you",
      lastMessageTime: "11:30pm",
    },
    {
      imageUrl: "",
      name: "xyz",
      lastMessage: "hi how are you",
      lastMessageTime: "11:30pm",
    },
    {
      imageUrl: "",
      name: "123",
      lastMessage: "hi how are you",
      lastMessageTime: "11:30pm",
    },
    {
      imageUrl: "",
      name: "sai",
      lastMessage: "hi how are you",
      lastMessageTime: "11:30pm",
    },
    {
      imageUrl: "",
      name: "sri",
      lastMessage: "hi how are you",
      lastMessageTime: "11:30pm",
    },
    {
      imageUrl: "",
      name: "abc",
      lastMessage: "hi how are you",
      lastMessageTime: "11:30pm",
    },
    {
      imageUrl: "",
      name: "xyz",
      lastMessage: "hi how are you",
      lastMessageTime: "11:30pm",
    },
    {
      imageUrl: "",
      name: "123",
      lastMessage: "hi how are you",
      lastMessageTime: "11:30pm",
    },
    {
      imageUrl: "",
      name: "sai",
      lastMessage: "hi how are you",
      lastMessageTime: "11:30pm",
    },
    {
      imageUrl: "",
      name: "sri",
      lastMessage: "hi how are you",
      lastMessageTime: "11:30pm",
    },
    {
      imageUrl: "",
      name: "abc",
      lastMessage: "hi how are you",
      lastMessageTime: "11:30pm",
    },
    {
      imageUrl: "",
      name: "xyz",
      lastMessage: "hi how are you",
      lastMessageTime: "11:30pm",
    },
    {
      imageUrl: "",
      name: "123",
      lastMessage: "hi how are you",
      lastMessageTime: "11:30pm",
    },
    {
      imageUrl: "",
      name: "sai",
      lastMessage: "hi how are you",
      lastMessageTime: "11:30pm",
    },
    {
      imageUrl: "",
      name: "sri",
      lastMessage: "hi how are you",
      lastMessageTime: "11:30pm",
    },
  ];

  return (
    <div className="chat-list-main-container">
      <ChatsListHeader />
      <ChatsListSearch />
      <div className="contacts-list-main-conatiner">
      {friendsList.map((item, key) => {
        return (
          <div key={key}>
            <ChatInfo
              imageUrl={item.imageUrl}
              lastMessage={item.lastMessage}
              lastMessageTime={item.lastMessageTime}
              friendName={item.name}
            />
          </div>
        );
      })}
      </div>
    </div>
  );
}

export default ChatsList;
