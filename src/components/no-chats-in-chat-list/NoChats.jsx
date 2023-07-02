import React from 'react';
import './nochats.css';
import { Link } from 'react-router-dom';

function NoChats() {
  return (
    <div className='no-chats-container'>
        <div>You have no active chats</div>
        <div>click here to <Link to={'/addcontact'}>add contact</Link></div>
    </div>
  )
}

export default NoChats