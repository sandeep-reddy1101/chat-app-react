import { io } from "socket.io-client";
import { justUpdateLastMessage, updateChatId, updateContact, updateContactWhenReceivedMessage, updateMessageUsingChatId } from "../store";

export const socket = io("http://localhost:4200");

export const mapSocketIds = (userId) => {
  socket.emit("map_socketId", userId);
};

export const listenToConnect = () => {
  socket.on("connect", () => {
    console.log("socket connected with id >>> ", socket.id);
  });
};

export const listenToMappingMessages = () => {
  socket.on("mapping_success", ({ userId, socketId }) => {
    console.log(`mapping success for user ${userId} with socket ${socketId}`);
  });
  socket.on("mapping_failed", ({ userId, socketId }) => {
    console.log(`mapping failed for user ${userId} with socket ${socketId}`);
  });
};

export const sendMessageThroughSocketToContact = (messageData) => {
  socket.emit("send_message_to_contact", messageData);
};

export const sendMessageThroughSocketToChat = (chatId, messageData) => {
  socket.emit("send_message_to_chat", chatId, messageData);
};

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

export const listenToSendMessageResponseToChat = (dispatch, messageData) => {
    socket.on("listen_after_sending_message_to_chat", (response) => {
        if(response) {
            dispatch(justUpdateLastMessage(messageData))
        }
    })
}

export const listenToAllReceiverMessages = (dispatch) => {
    socket.on("listen_to_all_sender_messages", (contactData) => {
        console.log("listen all receiver message")
        if(contactData){
            dispatch(updateContactWhenReceivedMessage(contactData))
            dispatch(updateMessageUsingChatId({chatId: contactData.chatId, lastMessageInfo: contactData.lastMessageInfo}))
        }
    })
}

// export const listenToReceivingMessages = () => {

// }
