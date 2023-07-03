import React, { useState } from "react";
import "./chats-list-search.css";

import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { searchContacts } from "../../services/functions";
import { clearSearch } from "../../store";

function ChatsListSearch() {
  const [viewSearchIcon, setViewSearchIcon] = useState(true);
  const [viewClearIcon, setViewClearIcon] = useState(false);
  const userContacts = useSelector((state) => state.user.value.contacts);
  const dispatch = useDispatch();

  const handleFocus = () => {
    setViewSearchIcon(false);
  };

  const handleBlur = () => {
    setViewSearchIcon(true);
  };

  const handleOnChange = (searchedValue) => {
    setViewClearIcon(true);
    searchContacts(searchedValue, userContacts, dispatch);
  };

  const handleClearOnClick = () => {
    setViewClearIcon(false);
    document.getElementById("chats-list-search").value = "";
    dispatch(clearSearch());
  };

  return (
    <div className="chat-list-search-main-container">
      <div className="chat-list-search-input-container">
        <input
          className="chat-list-search-input"
          type="text"
          placeholder="Search or start new chart"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => handleOnChange(e.target.value)}
          id="chats-list-search"
        />
        {viewSearchIcon ? (
          <span className="input-search-icon icon">
            <SearchIcon />
          </span>
        ) : (
          <span className="input-back-icon icon" onClick={handleClearOnClick}>
            <ArrowBackIcon />
          </span>
        )}
        {viewClearIcon && (
          <span className="input-clear-icon icon" onClick={handleClearOnClick}>
            <ClearIcon style={{ fontSize: '16px' }}/>
          </span>
        )}
      </div>
      <div className="chat-list-filter-icon icon">
        <FilterListIcon />
      </div>
    </div>
  );
}

export default ChatsListSearch;
