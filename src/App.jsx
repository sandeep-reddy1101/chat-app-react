import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import AddContact from "./pages/add-to-contacts/AddContact";
import Signup from "./pages/signup/SignUp";
import { useEffect } from "react";
import { getLastChatFromLocal, getUserInfoFromLocal } from "./services/localStorage";
import { getMessagesWithChatId, getUserContacts, getUserWithUserId } from "./services/get";
import { useDispatch } from "react-redux";
import { initializeContacts, loadMessages, login, updateChat } from "./store";

function App() {
  const dispatch = useDispatch();

  // Function to check whether user login and userId is present in local storage or not.
  // If present then it will fetch the user information form the backend and
  // dispatch a reducer to assign the user information to the user state
  // After that it will contacts of the user from backend and store them in contacts state in store
  const localStorageUserLogin = () => {
    const local = JSON.parse(getUserInfoFromLocal());
    if (local && local.login) {
      getUserWithUserId(local.userId)
        .then((userData) => {
          if (userData.flag) {
            const userInformation = userData.data;
            disptachUserDataToStore(userInformation);
            loadContactsInStore(local.userId);
            checkAndLoadLastChatFromLocalStorage();
          } else {
            console.log("Error in app component >>> ", userData.message);
          }
        })
        .catch((err) => {
          console.log("Error occured in app component >>> ", err.message);
        });
    }
  };

  // Funtion to fetch all the messages of the chat based on chatId.
  // It will dispatch a reducer to assign the fetched messages into messages of the chat state in store
  const loadMessageFromBackend = (chatId) => {
    getMessagesWithChatId(chatId).then((chatResponse) => {
      if(chatResponse.flag) {
        dispatch(loadMessages(chatResponse.data.chat))
      }else{
        console.log("Error occured while loading messages in chat info >>> ", chatResponse.message)
      }
    }).catch(err => {
      console.log("Error occured in chat info >>> ", err.message)
    })
  }

  // Function to check whether the chat information is present in local storage or not.
  // If present the it will dispatch the chat information to the chat state in the store.
  // And then it will load all the messages of the chat based on chatId and assign them to messages in chat state in the store
  const checkAndLoadLastChatFromLocalStorage = () => {
    const lastChat = JSON.parse(getLastChatFromLocal());
    if(lastChat.chatId) {
      dispatch(updateChat(lastChat));
      loadMessageFromBackend(lastChat.chatId);
    }
  }

  // Function to get user contacts from the backend and assign the contacts to contacts state in the store
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

  // Function to dispatch the login reducer, to store the user information into the user state
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
