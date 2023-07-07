import React from "react";
import "./contact-info.css";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useDispatch } from "react-redux";
import { updateChat } from "../../store";

function ContactInfo(
  {contactInformation}
) {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    const actionPayload = {
      senderId: contactInformation.userId,
      receiverId: contactInformation.contactUserId,
      messages: [],
      chatId: '',
      nickName: contactInformation.nickName
    };
    dispatch(updateChat(actionPayload));
  };

  return (
    <div className="contact-info-main-container" onClick={handleOnClick}>
      <div className="contact-info-user-profile-pic">
        <img
          src={contactInformation.profilePic ? contactInformation.profilePic : 'images/user-profile.avif'}
          alt="abc"
          className="contact-list-friend-profile-image user-profile-pic"
        />
      </div>
      <div className="contact-info-items">
        <span className="contact-list-friend-name">{contactInformation.nickName}</span>
        <span className="contact-list-info-icon icon">
          <InfoOutlinedIcon style={{ fontSize: "20px" }} />
        </span>
      </div>
    </div>
  );
}

export default ContactInfo;
