import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import AddContact from "./pages/add-to-contacts/AddContact";
import Signup from "./pages/signup/SignUp";
import { useEffect } from "react";
import { getUserInfoFromLocal } from "./services/localStorage";
import { getUserContacts, getUserWithUserId } from "./services/get";
import { useDispatch } from "react-redux";
import { initializeContacts, login } from "./store";

function App() {
  const dispatch = useDispatch();

  const localStorageUserLogin = () => {
    const local = JSON.parse(getUserInfoFromLocal());
    if (local && local.login) {
      getUserWithUserId(local.userId)
        .then((userData) => {
          if (userData.flag) {
            const userInformation = userData.data;
            disptachUserDataToStore(userInformation);
            loadContactsInStore(local.userId);
          } else {
            console.log("Error in app component >>> ", userData.message);
          }
        })
        .catch((err) => {
          console.log("Error occured in app component >>> ", err.message);
        });
    }
  };

  const loadContactsInStore = (userId) => {
    getUserContacts(userId).then((contactsResponse) => {
      if (contactsResponse.flag) {
        dispatch(initializeContacts(contactsResponse.data));
      } else {
        console.log(
          "Failed to load the contacts in app component when page refreshes >>> ",
          contactsResponse.message
        );
      }
    });
  };

  const disptachUserDataToStore = (userInformation) => {
    const actionPayload = {
      login: true,
      phoneNo: userInformation.phoneNo,
      userId: userInformation._id,
      firstName: userInformation.firstName,
      lastName: userInformation.lastName,
    };
    dispatch(login(actionPayload));
  };

  useEffect(() => {
    localStorageUserLogin();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addcontact" element={<AddContact />} />
      </Routes>
    </Router>
  );
}

export default App;
