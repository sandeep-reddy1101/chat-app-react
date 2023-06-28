import React, { useState } from "react";
import "./chats-list-search.css";

import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function ChatsListSearch() {
  const [viewSearchIcon, setViewSearchIcon] = useState(true);

  const handleFocus = () => {
    setViewSearchIcon(false);
  };

  const handleBlur = () => {
    setViewSearchIcon(true)
  }

  return (
    <div className="chat-list-search-main-container">
      <div className="chat-list-search-input-container">
        <input
          className="chat-list-search-input"
          type="text"
          placeholder="Search or start new chart"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {viewSearchIcon ? (
          <span className="input-search-icon icon">
            <SearchIcon />
          </span>
        ) : (
          <span className="input-back-icon icon">
            <ArrowBackIcon />
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
