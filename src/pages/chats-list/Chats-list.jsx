import React, { useEffect } from "react";
import "./chats-list.css";
import ChatsListHeader from "../../components/chat-list-header/Chats-list-header";
import ChatsListSearch from "../../components/chat-list-search/Chats-list-search";
import ChatInfo from "../../components/chat-info/Chat-info";
import { useSelector } from "react-redux";
import NoChats from "../../components/no-chats-in-chat-list/NoChats";

function ChatsList() {
  const userInfo = useSelector((state) => state.user.value);
  const searchResults = useSelector((state) => state.searchContacts.value);

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

  useEffect(() => {
    console.log(userInfo);
  }, []);

  return (
    <div className="chat-list-main-container">
      <ChatsListHeader />
      <ChatsListSearch />
      {renderUI(searchResults, userInfo)}
    </div>
  );
}

export default ChatsList;

const renderUI = (searchResults, userInfo) => {
  if (searchResults.search) {
    console.log("searched results to render >>> ", searchResults)
    return <div>searched contacts</div>;
  } else {
    if (userInfo.chats.length > 0) {
      return (
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
      );
    } else {
      return <NoChats />;
    }
  }
};
