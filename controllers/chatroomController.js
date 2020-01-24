const Chatroom = require("../models/").Chatroom;
const Message = require("../models/").Message;
const User = require("../models/").User;
const { sucRes, failRes } = require("../helper/resFormat");

// GET request to get all chatrooms
async function showAllChatroom(req, res, next) {
  try {
    let foundChatrooms = await Chatroom.findAll();
    res.status(200).json(sucRes(foundChatrooms, "Show all chatroom"));
  } catch (err) {
    res.status(400).json(failRes(err));
  }
}

// Get new messages from chatroom since user logged in
async function showUnreadMessage(req, res, next) {
  try {
    let foundMessages = await Message.findAll({
      where: {
        createdAt: {
          $gt: req.decoded.lastLogout //show all message after logout
        }
      }
    });
    res.status(200).json(sucRes(foundMessages, "Show new message"));
  } catch (err) {
    res.status(400).json(failRes(err));
  }
}

// get request to get all messages of a chatroom
async function showAllMessage(req, res, next) {
  try {
    let foundMessages = await Message.findAll({
      where: {
        chatroom_id: req.params.chatroom_id
      }
    });
    res
      .status(200)
      .json(
        sucRes(
          foundMessages,
          `Show all message of a chatroom with id: ${req.params.chatroom_id}`
        )
      );
  } catch (err) {
    res.status(400).json(failRes(err, "Fail show all message"));
  }
}

//post request to post chatroom. Create chatroom can used to chatting via group with identity name of group
async function createRoom(req, res, next) {
  let nameRoom = req.body.name;
  let chatroom = await Chatroom.findOne({
    where: { name: nameRoom }
  });

  if (chatroom == null) {
    let addChatroom = await Chatroom.create({ name: nameRoom });
    res.status(201).json(sucRes(addChatroom, "Create chatroom success"));
  } else {
    res.status(400).json(failRes(chatroom, "Chatroom name already exist"));
  }
}

module.exports = {
  showAllChatroom,
  showUnreadMessage,
  showAllMessage,
  createRoom
};
