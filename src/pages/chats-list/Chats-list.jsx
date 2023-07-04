import React, { useEffect } from "react";
import "./chats-list.css";
import ChatsListHeader from "../../components/chat-list-header/Chats-list-header";
import ChatsListSearch from "../../components/chat-list-search/Chats-list-search";
import ChatInfo from "../../components/chat-info/Chat-info";
import { useSelector } from "react-redux";
import NoChats from "../../components/no-chats-in-chat-list/NoChats";
import ContactInfo from "../../components/contact-info/ContactInfo";

function ChatsList() {
  const userInfo = useSelector((state) => state.user.value);
  const searchResults = useSelector((state) => state.searchContacts.value);

  // useEffect(() => {
  //   console.log(userInfo);
  // }, []);

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
    const serchedContacts = searchResults.resultContacts;
    return (
      <div className="contacts-list-main-conatiner">
        <p className="text-center m-3">Searched contacts result</p>
        {serchedContacts.map((item, key) => {
          return (
            <div key={key}>
              <ContactInfo friendName={item.name} friendPhoneNo={item.phoneNo}/>
            </div>
          )
        })}
      </div>
    );
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
