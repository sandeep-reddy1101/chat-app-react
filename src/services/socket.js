import io from "socket.io-client"

export const socket = io('ws://localhost:4200');

export const connect = () => {
    socket.emit("message", "hi server")
}

export const listenToMessage = () => {
    socket.on("message", (data) => {
        console.log(data)
    })
}

export const socketDisconnect = () => {
    socket.disconnect()
}