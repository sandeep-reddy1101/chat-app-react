import io from "socket.io-client"

export const socket = io('ws://localhost:4200');

export const connect = (userId) => {
    socket.emit("map socketId", userId)
}