import React from 'react';
import "./chats-list-header.css";

import MessageIcon from "@mui/icons-material/Message";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeLastChatFromLocal, removeUserInfoFromLocal } from '../../services/localStorage';
import { clearChat, clearContacts, logout } from '../../store';

function ChatsListHeader() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addContact = () => {
    navigate("/addcontact")
  }

  const handleSignOut = () => {
    removeUserInfoFromLocal();
    removeLastChatFromLocal();
    dispatch(logout());
    dispatch(clearChat());
    dispatch(clearContacts());
    navigate("/login");
  }

  return (
    <div className="chat-list-header-container">
        <div className="chat-list-header">
            <div className="chat-list-header-image-container">
              <img
                src="images/user-profile.avif"
                alt="user profile"
                className="header-image user-profile-pic"
              />
            </div>
            <div className="chat-list-header-icons">
              <span onClick={handleSignOut}><LogoutOutlinedIcon className='icon'/></span>
              <span onClick={addContact}><PersonAddAlt1OutlinedIcon className='icon'/></span>
              <span><MessageIcon className='icon'/></span>
              <span><MoreVertIcon className='icon'/></span>
            </div>
        </div>
      </div>
  )
}

export default ChatsListHeader