import { io } from "socket.io-client";
import {
  justUpdateLastMessage,
  updateChatId,
  updateContact,
  updateContactWhenReceivedMessage,
  updateMessageUsingChatId,
} from "../store";

// Creating the socket connection with the backend URL
export const socket = io("http://localhost:4200");

// Function to emit the map_socketId event to the backend
// It will send the userId of the logged in user
export const mapSocketIds = (userId) => {
  socket.emit("map_socketId", userId);
};

// Function to listen to the connect event from the backend.
// This event is triggered when there is a socket connection between cilent and server
export const listenToConnect = () => {
  socket.on("connect", () => {
    console.log("socket connected with id >>> ", socket.id);
  });
};

// Funciton to listen to mapping_success and mapping_failed events from the backend/server
// This events are emitted from the server when the server creates a mapping between connected socketId and userId
export const listenToMappingMessages = () => {
  socket.on("mapping_success", ({ userId, socketId }) => {
    console.log(`mapping success for user ${userId} with socket ${socketId}`);
  });
  socket.on("mapping_failed", ({ userId, socketId }) => {
    console.log(`mapping failed for user ${userId} with socket ${socketId}`);
  });
};

// Function to emit the send_message_to_contact event to the server,
// when the user send a message to the new contact/ when user starts chat with the new contact
export const sendMessageThroughSocketToContact = (messageData) => {
  socket.emit("send_message_to_contact", messageData);
};

// Function to emit the send_message_to_chat event to the server,
// when the user send a message in the existing chat / active chat
export const sendMessageThroughSocketToChat = (chatId, messageData) => {
  socket.emit("send_message_to_chat", chatId, messageData);
};

// Function to listen to the event listen_after_sending_message_to_contact,
export const listenToSendMessageResponseToContact = (dispatch) => {
  socket.on("listen_after_sending_message_to_contact", (messageData) => {
    if (messageData.length > 0) {
      dispatch(updateChatId(messageData[0]._id));
      dispatch(
        updateContact({
          chatId: messageData[0]._id,
          receiverId: messageData[0].chat[0].receiverId,
          lastMessageInfo: messageData[0].chat[0],
        })
      );
    }
  });
};

// Function to listen to the socket event listen_after_sending_message_to_chat
export const listenToSendMessageResponseToChat = (dispatch, messageData) => {
  socket.on("listen_after_sending_message_to_chat", (response) => {
    if (response) {
      dispatch(justUpdateLastMessage(messageData));
    }
  });
};

// Function to listen to all the other user who sends message to the current logged in user
export const listenToAllReceiverMessages = (dispatch) => {
  socket.on("listen_to_all_sender_messages", (contactData) => {
    console.log("listen all receiver message");
    if (contactData) {
      dispatch(updateContactWhenReceivedMessage(contactData));
      dispatch(
        updateMessageUsingChatId({
          chatId: contactData.chatId,
          lastMessageInfo: contactData.lastMessageInfo,
        })
      );
    }
  });
};
