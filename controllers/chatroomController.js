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
  if (!req.decoded.id) {
    res.status(404).json(failRes("User Not Found"));
  }
  try {
    let foundMessages = await Message.findAll({
      where: {
        createdAt: {
          $gt: req.decoded.lastLogout //menampilkan semua messsage yang dibuat pada waktu setelah user logout
        }
      }
      //   include: [
      //     { model: User, attributes: ["fullname", "email"] },
      //     { model: Chatroom, attributes: ["name"] }
      //   ]
    });
    res.status(200).json(sucRes(foundMessages, "Show new message"));
  } catch (err) {
    res.status(400).json(failRes(err));
  }
}

// get request to get all messages of a chatroom
async function showAllMessage(req, res, next) {
  console.log({ chatroom_id: req.params.chatroom_id });
  try {
    let foundMessages = await Message.findAll({
      where: {
        chatroom_id: req.params.chatroom_id
      }
      //   include: [
      //     { model: User, attributes: ["fullname", "email"] },
      //     { model: Chatroom, attributes: ["name"] }
      //   ],
      //   order: [["cretedAt", "ASC"]]
    });
    res
      .status(200)
      .json(sucRes(foundMessages, "Show all message of a chatroom"));
  } catch (next) {}
}

//post request to post chatroom
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

// //post request to add a message
// async function addMessage(req, res, next) {
//   try {
//     let foundUser = await User.findById(req.decoded.id);
//     let createdMessage = await Message.create(req.body).toJSON();

//     createdMessage.user_id = foundUser;
//     createdMessage.save();

//     res.status(201).json(sucRes(createdMessage, "Add message success"));
//   } catch (err) {
//     res.status(400).json(failRes(err));
//   }
// }

module.exports = {
  showAllChatroom,
  showUnreadMessage,
  showAllMessage,
  createRoom
};
