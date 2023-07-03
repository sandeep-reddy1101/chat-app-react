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

export const addContact = (userId, contactObj) => {
  const body = {
    userId: userId,
    contactObj: JSON.stringify(contactObj),
  };
  console.log("user id >>> ", userId)
  return axios
    .post(`${backendAPI}/users/add-contact`, body)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};
