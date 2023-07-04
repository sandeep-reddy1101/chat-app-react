import io from "socket.io-client";

export const getSocket = () => {
  const socket = io("ws://localhost:4200");
  return socket;
};

export const connect = (userId) => {
  const socket = getSocket();
  socket.emit("map socketId", userId);
};

export const sendMessageThroughSocket = (messageData) => {
  const socket = getSocket();
  socket.emit("send message", messageData);
};
