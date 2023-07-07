import React, { useEffect } from "react";
import "./chat-content.css";

// import { conversation } from "../../services/conversation";
import Message from "../../components/message/Message";
import ChatContentHeader from "../../components/chat-content-header/Chat-content-header";
import ChatContentFooter from "../../components/chat-content-footer/Chat-content-footer";
import { useSelector } from "react-redux";

function ChatContent() {
  const chat = useSelector((state) => state.chat.value);

  const conversation = chat.messages;

  const scrollToBottom = () => {
    let messageContainer = document.getElementById("chat-content-messages");
    messageContainer.scrollTop = messageContainer.scrollHeight;
  };

  useEffect(() => {
    if(chat.receiverId){
      scrollToBottom();
    }
  }, []);

  return (
    <>
      {chat.receiverId ? (
        <>
          <div className="chat-content-main-container">
            <ChatContentHeader friendName={chat.nickName} />
            <div className="chat-content px-3 pb-2" id="chat-content-messages">
              {conversation.length > 0 && conversation.map((item, key) => {
                return (
                  <div key={key} className="single-message">
                    <Message
                      message={item.message}
                      senderId={item.senderId}
                      time={item.time}
                    />
                  </div>
                );
              })}
            </div>
            <ChatContentFooter />
          </div>
        </>
      ) : (
        <>
          <div>No chat selected</div>
        </>
      )}
    </>
  );
}

export default ChatContent;
