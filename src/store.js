import { configureStore, createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  login: false,
  userId: "",
  phoneNo: null,
  firstName: "",
  lastName: "",
  chats: [],
  contacts: [],
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
    updateContact: (state, action) => {
      state.value.contacts.push(action.payload);
    }
  },
});

export const { login, logout, updateContact } = userInfoSlice.actions;

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


const chatInitialState = {userId: '', friendId: '', friendPhoneNo: '', messages: [], friendName: ''};
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
      state.value.messages.push(action.payload)
    }
  }
})

export const { updateChat, clearChat, addMessage } = chatSlice.actions;

export const store = configureStore({
  reducer: {
    user: userInfoSlice.reducer,
    searchContacts: searchContactsSlice.reducer,
    chat: chatSlice.reducer,
  },
});
