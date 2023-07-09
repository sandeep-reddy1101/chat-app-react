const localKeys = { userInfo : "userInfo", lastChat: "lastChat" }

// Returns value from local storage based on key
export const getUserInfoFromLocal = () => {
    const value = localStorage.getItem(localKeys.userInfo);
    return value;
}

// Adds key value pair to local storage
export const setUserInfoToLocal = (value) => {
    localStorage.setItem(localKeys.userInfo, value);
}

// Removes the key value pair from local storage
export const removeUserInfoFromLocal = () => {
    localStorage.removeItem(localKeys.userInfo);
}

export const setLastChatToLocal = (chatObj) => {
    localStorage.setItem(localKeys.lastChat, chatObj)
}

export const removeLastChatFromLocal = () => {
    localStorage.removeItem(localKeys.lastChat)
}

export const getLastChatFromLocal = () => {
    const value = localStorage.getItem(localKeys.lastChat);
    return value
}