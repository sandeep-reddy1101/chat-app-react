const localKeys = { userInfo : "userInfo" }

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