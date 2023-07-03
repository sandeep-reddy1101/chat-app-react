import React from "react";
import "./contact-info.css";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useDispatch, useSelector } from "react-redux";
import { updateChat } from "../../store";

function ContactInfo({
  imageUrl = "images/user-profile.avif",
  friendName,
  friendPhoneNo,
}) {
  const userInfo = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const handleOnClick = () => {
    const actionPayload = {
      userId: userInfo.userId,
      friendId: "",
      friendPhoneNo: friendPhoneNo,
      messages: [],
      friendName: friendName
    };
    dispatch(updateChat(actionPayload));
  };

  return (
    <div className="contact-info-main-container" onClick={handleOnClick}>
      <div className="contact-info-user-profile-pic">
        <img
          src={imageUrl}
          alt="abc"
          className="contact-list-friend-profile-image user-profile-pic"
        />
      </div>
      <div className="contact-info-items">
        <span className="contact-list-friend-name">{friendName}</span>
        <span className="contact-list-info-icon icon">
          <InfoOutlinedIcon style={{ fontSize: "20px" }} />
        </span>
      </div>
    </div>
  );
}

export default ContactInfo;
