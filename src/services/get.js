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

export const getUserWithUserId = (userId) => {
  return axios
    .get(`${backendAPI}/users/get-user-with-userId/${userId}`)
    .then((res) => {
      if (res.data.flag) {
        return getUserContacts(res.data.data[0].contacts)
          .then((data) => {
            if(data.flag){
              res.data.data[0].contacts = data.data
              return res.data
            }else {
              return {message: "failed to fetch contacts information", flag: false}
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const getUserContacts = (contactsIdsList) => {
  const body = {
    contactsIdsList: JSON.stringify(contactsIdsList),
  };
  return axios
    .post(`${backendAPI}/contacts/get-bulk-contacts`, body)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err.message);
    });
};
