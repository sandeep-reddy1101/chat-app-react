import axios from "axios";

const backendAPI = "http://localhost:4200";

// Function to send the post axios request to the server to add new user into database
export const insertUser = (firstName, lastName, phoneNo, password) => {
  const body = {
    firstName: firstName,
    lastName: lastName,
    phoneNo: phoneNo,
    password: password,
  };
  return axios
    .post(`${backendAPI}/users/insert-user`, body)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err.message);
    });
};

// Function to send the post axios request to the server to add new contact for the user
export const addContact = (userId, nickName, contactPhoneNo) => {
  const body = {
    userId: userId,
    nickName: nickName,
    contactPhoneNo: contactPhoneNo
  };
  return axios
    .post(`${backendAPI}/contacts/create-contact`, body)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};
