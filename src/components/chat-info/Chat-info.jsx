import React from "react";
import "./chat-info.css";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesWithChatId } from "../../services/get";
import { loadMessages, updateChat } from "../../store";
import { formatTime } from "../../services/functions";
import { setLastChatToLocal } from "../../services/localStorage";

function ChatInfo({
  chatInformation
}) {
  const userId = useSelector(state => state.user.value.userId)
  const dispatch = useDispatch();

  const formatedTime = formatTime(chatInformation.lastMessageInfo.time);

  const loadMessageFromBackend = (chatId) => {
    getMessagesWithChatId(chatId).then((chatResponse) => {
      if(chatResponse.flag) {
        dispatch(loadMessages(chatResponse.data.chat));
      }else{
        console.log("Error occured while loading messages in chat info >>> ", chatResponse.message)
      }
    }).catch(err => {
      console.log("Error occured in chat info >>> ", err.message)
    })
  }

  const handleOnclick = () => {
    const actionPayload = {
      senderId: chatInformation.userId,
      receiverId: chatInformation.contactUserId,
      messages: [],
      chatId: chatInformation.chatId,
      nickName: chatInformation.nickName
    };
    dispatch(updateChat(actionPayload));
    loadMessageFromBackend(chatInformation.chatId)
    setLastChatToLocal(JSON.stringify(actionPayload))
  }

  return (
    <div className="chat-info-main-container" onClick={handleOnclick}>
      <div className="chat-info-user-profile-pic">
        <img
          src={chatInformation.profilePic ? chatInformation.profilePic : "images/user-profile.avif"}
          alt="abc"
          className="chat-list-friend-profile-image user-profile-pic"
        />
      </div>
      <div className="chat-info-items">
        <div className="chat-info-item-header">
          <p className="chat-list-friend-name">{chatInformation.nickName}</p>
          <p className="chat-last-message-time">{formatedTime}</p>
        </div>
        <div className="chat-info-item-content">
          <p className="chat-last-message">{userId === chatInformation.lastMessageInfo.senderId ? "You: " : ""}{chatInformation.lastMessageInfo.message}</p>
        </div>
      </div>
    </div>
  );
}

export default ChatInfo;
