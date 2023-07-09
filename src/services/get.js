import axios from "axios";

const backendAPI = "http://localhost:4200";

// Function to send the axios request to verify the user login
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

// Function to send the axios request to fetch all the contacts of the user
export const getUserContacts = (userId) => {
  return axios
    .get(`${backendAPI}/contacts/get-user-contacts/${userId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err.message);
    });
};

// Function to send the axios request for fetching the user information using userId
export const getUserWithUserId = (userId) => {
  return axios
    .get(`${backendAPI}/users/get-user-with-userId/${userId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err.message);
    });
}

// Function to send the axios request to fetch the messsage of the chat based on chatId
export const getMessagesWithChatId = (chatId) => {
  return axios
    .get(`${backendAPI}/chats/get-chat-with-chatId/${chatId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err.message);
    });
}