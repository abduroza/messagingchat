const Message = require("../models/message");
const User = require("../models/user");

/**
 * socketEvents - Attaches the socket events to the server
 * @param {function} io - socket.io server
 * @returns {function} Returns io with event listeners attached
 */
const socketEvents = io => {
  io.on("connection", socket => {
    console.log(`A user has connected! SocketId: ${socket.id}`);

    socket.on("join", chatroom_id => {
      socket.join(chatroom_id);
    });

    socket.on("leave", chatroom_id => {
      socket.leave(chatroom_id);
    });

    socket.on("disconnect", () => {
      console.log(`SocketId: ${socket.id} has disconnected!`);
    });

    socket.on("newMessage", newMessage => {
      socket.broadcast
        .to(newMessage.chatroom_id)
        .emit("addMessage", newMessage);
    });
  });
};

module.exports = socketEvents;
