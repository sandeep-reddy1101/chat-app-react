import { configureStore, createSlice } from "@reduxjs/toolkit";
import { sortArrayUsingTime } from "./services/functions";

const userInitialState = {
  login: false,
  userId: "",
  phoneNo: null,
  firstName: "",
  lastName: "",
};

const userInfoSlice = createSlice({
  name: "user",
  initialState: { value: userInitialState },
  reducers: {
    // Reducer to assign the user details to the state value
    login: (state, action) => {
      state.value = action.payload;
    },
    // Reducer to remove the user details from the state value
    logout: (state) => {
      state.value = userInitialState;
    },
  },
});

export const { login, logout } = userInfoSlice.actions;

const searchContactsInitialState = {search: false, resultContacts: [], searchedString: ''}
const searchContactsSlice = createSlice({
  name: "searchContacts",
  initialState: {value : searchContactsInitialState},
  reducers: {
    // Reducer to clear the search results
    clearSearch: (state) => {
      state.value = searchContactsInitialState
    },
    // Reducer to update the search results in the state value
    updateSearch: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { clearSearch, updateSearch } = searchContactsSlice.actions;


const chatInitialState = {chatId: '', messages: [], senderId: '', receiverId: '', nickName: ''};
const chatSlice = createSlice({
  name: "chat",
  initialState: {value: chatInitialState},
  reducers: {
    // reducer to update the chat details like senderId, chatId, messages, receiverId, nickName
    // payload should be {chatId: 'asd', messages: [], senderId: 'ads', receiverId: 'asd', nickName: 'adf'}
    updateChat: (state, action) => {
      state.value = action.payload
    },
    // reducer to clear the chat which will assign the initial state to the state value
    // payload not required
    clearChat: (state) => {
      state.value = chatInitialState
    },
    // reducer to add the message to message array, it will add it in the 0th position of the array
    // payload should be {senderId: "adf", receiverId: "asd", message: "ji", time: adf}
    addMessage: (state, action) => {
      state.value.messages.unshift(action.payload)
    },
    // reducer to assign the messages array to the state value
    // payload should be [{senderId: "adf", receiverId: "asd", message: "ji", time: adf}....]
    loadMessages: (state, action) => {
      state.value.messages = action.payload.reverse()
    },
    // reducer to update the chatId of the chat
    // payload should be a chatId string 
    updateChatId: (state, action) => {
      state.value.chatId = action.payload
    },
    // reducer to add message if chatId matches
    // payload should be {chatId: 'asf', messages: [], senderId: 'ads', receiverId: 'adsf', nickName: 'adsf'}
    updateMessageUsingChatId: (state, action) => {
      if(state.value.chatId === action.payload.chatId){
        if(state.value.messages[0]._id !== action.payload.lastMessageInfo._id){
          state.value.messages.unshift(action.payload.lastMessageInfo)
        }
      }
    }
  }
})

export const { updateChat, clearChat, addMessage, loadMessages,updateChatId, updateMessageUsingChatId } = chatSlice.actions;

const contactsInitialState = []

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {value: contactsInitialState},
  reducers: {
    // Reducer to load all the user contacts into the state value
    initializeContacts: (state, action) => {
      state.value = action.payload
    },
    // Reducer to remove the user contacts from the state value (ex: when user logout)
    clearContacts: (state) => {
      state.value = contactsInitialState
    },
    // Reducer to add a new contact into the contacts array
    pushContactToList: (state, action) => {
      state.value.push(action.payload)
    },
    // Reducer to update one contact based on contactUserId of the contact and receiverId of the message
    // It will update the chatId, active, lastMessageInfo and udpatedAt values of the contact
    updateContact: (state, action) => {
      const obj = action.payload;
      const arr = state.value;
      const newArr = arr.map((contact) => {
        if(obj.receiverId === contact.contactUserId){
          contact.chatId = obj.chatId;
          contact.active = true,
          contact.lastMessageInfo = obj.lastMessageInfo
          contact.updatedAt = new Date().getTime()
        }
        return contact
      })
      const resultArr = sortArrayUsingTime(newArr)
      state.value = resultArr
    },
    // Reducer to update the lastMessageInfo and updatedAt of the contact 
    justUpdateLastMessage: (state, action) => {
      const contacts = state.value;
      const updatedContacts = contacts.map((contact) => {
        if(contact.contactUserId === action.payload.receiverId){
          contact.lastMessageInfo = action.payload
          contact.updatedAt = action.payload.time
        }
        return contact
      });
      const resultArr = sortArrayUsingTime(updatedContacts)
      state.value = resultArr;
    },
    // Reducer to update the contact when we receive a message from another user
    updateContactWhenReceivedMessage: (state, action) => {
      const newContactsArr = state.value.filter((contact) => {
        if(contact.contactUserId === action.payload.contactUserId){
          return false
        }
        return true
      })
      newContactsArr.unshift(action.payload);
      state.value = newContactsArr
    }
  }
})

export const { initializeContacts, clearContacts, pushContactToList, updateContact, justUpdateLastMessage, updateContactWhenReceivedMessage } = contactsSlice.actions;

export const store = configureStore({
  reducer: {
    user: userInfoSlice.reducer,
    searchContacts: searchContactsSlice.reducer,
    chat: chatSlice.reducer,
    contacts: contactsSlice.reducer,
  },
});
