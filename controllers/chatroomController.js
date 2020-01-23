const Chatroom = require("../models/").Chatroom;
const Message = require("../models/").Message;
const User = require("../models/").User;
const { sucRes, failRes } = require("../helper/resFormat");

// GET request to get all chatrooms
async function showAllChatroom(req, res, next) {
  try {
    let foundChatrooms = await Chatroom.findAll();
    res.status(200).json(sucRes(foundChatrooms, "Show all chatroom"));
  } catch (next) {}
}

// Get new messages from chatroom since user logged in
async function showUnreadMessage(req, res, next) {
  if (!req.user) {
    res.status(404).json(failRes("User Not Found"));
  }
  try {
    let foundMessages = await Message.findAll({
      where: {
        createdAt: {
          $gt: req.user.lastLogout
        }
      },
      include: [
        { model: User, attributes: ["fullname", "email"] },
        { model: Chatroom, attributes: ["name"] }
      ]
    });
    res.status(200).json(sucRes(foundMessages, "Show new message"));
  } catch (next) {}
}

// get request to get all messages of a chatroom
async function showAllMessage(req, res, next) {
  try {
    let foundMessages = await Message.findAll({
      where: {
        chatroom_id: req.params.chatroom_id
      },
      include: [
        { model: User, attributes: ["fullname", "email"] },
        { model: Chatroom, attributes: ["name"] }
      ],
      order: [["cretedAt", "ASC"]]
    });
    res
      .status(200)
      .json(sucRes(foundMessages, "Show all message of a chatroom"));
  } catch (next) {}
}

module.exports = { showAllChatroom, showUnreadMessage, showAllMessage };
