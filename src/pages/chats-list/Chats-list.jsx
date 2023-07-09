import React from "react";
import "./chats-list.css";
import ChatsListHeader from "../../components/chat-list-header/Chats-list-header";
import ChatsListSearch from "../../components/chat-list-search/Chats-list-search";
import ChatInfo from "../../components/chat-info/Chat-info";
import { useSelector } from "react-redux";
import NoChats from "../../components/no-chats-in-chat-list/NoChats";
import ContactInfo from "../../components/contact-info/ContactInfo";
import { filterActiveChats } from "../../services/functions";

function ChatsList() {
  const contacts = useSelector((state) => state.contacts.value); 
  const searchResults = useSelector((state) => state.searchContacts.value);

  // It will filter all the active contacts(chats) from all the user contacts
  const activeChats = filterActiveChats(contacts);

  return (
    <div className="chat-list-main-container">
      <ChatsListHeader />
      <ChatsListSearch />
      {renderUI(searchResults, activeChats)}
    </div>
  );
}

export default ChatsList;

const renderUI = (searchResults, activeChats) => {
  if (searchResults.search && searchResults.resultContacts.length > 0) {
    const activeSerchedContacts = searchResults.resultContacts[0];
    const nonActiveSearchedContacts = searchResults.resultContacts[1];
    return (
      <>
        {activeSerchedContacts.length > 0 && (
          <>
            <div className="contacts-list-main-conatiner">
              <p className="text-center m-3">Chats</p>
              {activeSerchedContacts?.map((item, key) => {
                return (
                  <div key={key}>
                    <ChatInfo
                      chatInformation={item}
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}
        {nonActiveSearchedContacts.length > 0 && (
          <>
            <div className="contacts-list-main-conatiner">
              <p className="text-center m-3">Other contacts</p>
              {nonActiveSearchedContacts.map((item, key) => {
                return (
                  <div key={key}>
                    <ContactInfo
                      contactInformation = {item}
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </>
    );
  } else {
    if (activeChats.length > 0) {
      return (
        <div className="contacts-list-main-conatiner">
          {activeChats.map((item, key) => {
            return (
              <div key={key}>
                <ChatInfo
                  chatInformation={item}
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
