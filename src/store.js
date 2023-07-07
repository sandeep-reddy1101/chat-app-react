import { configureStore, createSlice } from "@reduxjs/toolkit";

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
    login: (state, action) => {
      state.value = action.payload;
    },
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
    clearSearch: (state) => {
      state.value = searchContactsInitialState
    },
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
    updateChat: (state, action) => {
      state.value = action.payload
    },
    clearChat: (state) => {
      state.value = chatInitialState
    },
    addMessage: (state, action) => {
      state.value.messages.unshift(action.payload)
    },
    loadMessages: (state, action) => {
      state.value.messages = action.payload.reverse()
    },
    updateChatId: (state, action) => {
      state.value.chatId = action.payload
    },
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
    initializeContacts: (state, action) => {
      state.value = action.payload
    },
    pushContactToList: (state, action) => {
      state.value.push(action.payload)
    },
    updateContact: (state, action) => {
      const obj = action.payload;
      const arr = state.value;
      const newArr = arr.map((contact) => {
        if(obj.receiverId === contact.contactUserId){
          contact.chatId = obj.chatId;
          contact.active = true,
          contact.lastMessageInfo = obj.lastMessageInfo
        }
        return contact
      })
      state.value = newArr
    },
    justUpdateLastMessage: (state, action) => {
      const contacts = state.value;
      const updatedContacts = contacts.map((contact) => {
        if(contact.contactUserId === action.payload.receiverId){
          contact.lastMessageInfo = action.payload
        }
        return contact
      });
      state.value = updatedContacts;
    },
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

export const { initializeContacts, pushContactToList, updateContact, justUpdateLastMessage, updateContactWhenReceivedMessage } = contactsSlice.actions;

export const store = configureStore({
  reducer: {
    user: userInfoSlice.reducer,
    searchContacts: searchContactsSlice.reducer,
    chat: chatSlice.reducer,
    contacts: contactsSlice.reducer,
  },
});
