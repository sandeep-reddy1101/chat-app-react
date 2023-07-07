import axios from "axios";

const backendAPI = "http://localhost:4200";

export const verifyUserLogin = (phoneNo, password) => {
  const body = {
    phoneNo: phoneNo,
    password: password,
  };
  return axios
    .post(`${backendAPI}/users/verify-user`, body)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err.message);
    });
};

export const getUserContacts = (userId) => {
  return axios
    .get(`${backendAPI}/contacts/get-user-contacts/${userId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err.message);
    });
};

export const getUserWithUserId = (userId) => {
  return axios
    .get(`${backendAPI}/users/get-user-with-userId/${userId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err.message);
    });
}


export const getMessagesWithChatId = (chatId) => {
  return axios
    .get(`${backendAPI}/chats/get-chat-with-chatId/${chatId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err.message);
    });
}