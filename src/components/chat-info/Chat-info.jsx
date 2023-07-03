import React from "react";
import "./chat-info.css";
import { useDispatch, useSelector } from "react-redux";

function ChatInfo({
  imageUrl = "images/user-profile.avif",
  friendName,
  lastMessage = "",
  lastMessageTime = null,
}) {
  const userInfo = useSelector(state => state.user.value);
  const dispatch = useDispatch();

  const handleOnclick = () => {
    const actionPayload = {
      userId: userInfo.userId,
      friendId: "",
      friendPhoneNo: friendPhoneNo,
      messages: [], // here we have to send the conversation : TODO
      friendName: friendName
    };
    dispatch(updateChat(actionPayload));
  }

  return (
    <div className="chat-info-main-container" onClick={handleOnclick}>
      <div className="chat-info-user-profile-pic">
        <img
          src={imageUrl ? imageUrl : "images/user-profile.avif"}
          alt="abc"
          className="chat-list-friend-profile-image user-profile-pic"
        />
      </div>
      <div className="chat-info-items">
        <div className="chat-info-item-header">
          <p className="chat-list-friend-name">{friendName}</p>
          <p className="chat-last-message-time">{lastMessageTime}</p>
        </div>
        <div className="chat-info-item-content">
          <p className="chat-last-message">{lastMessage}</p>
        </div>
      </div>
    </div>
  );
}

export default ChatInfo;
