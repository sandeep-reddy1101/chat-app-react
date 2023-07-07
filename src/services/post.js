import axios from "axios";

const backendAPI = "http://localhost:4200";

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
