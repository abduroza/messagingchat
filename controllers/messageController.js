const Message = require("../models").Message;
const Chatroom = require("../models").Chatroom;
const User = require("../models").User;
const { Op } = require("sequelize");
const { sucRes, failRes } = require("../helper/resFormat");

//send message di group
async function addMessage(req, res) {
  try {
    let chatroom = await Chatroom.findAll({
      where: { name: req.body.name }
    });

    let chatroom_id = chatroom[0].id;
    let message = await Message.create({
      chatroom_id: chatroom_id,
      user_id: req.decoded.id,
      content: req.body.content
    });
    res.status(201).json(sucRes(message, "Create message success"));
  } catch (err) {
    res.status(400).json(failRes(err, "Fail to create message"));
  }
}

async function getMySentMessage(req, res) {
  try {
    let messages = await Message.findAll({
      where: { user_id: req.decoded.id }
    });
    res.status(201).json(sucRes(messages, "Your sent message"));
  } catch (err) {
    res.status(404).json(failRes(err, "You don't have sent message"));
  }
}

//sending private chat. yg perlu diisi di req.body: fullname orang lain dan content
async function addPrivateChat(req, res) {
  //mencari user lain yg akan diajak chat privat
  try {
    //mencari user lain yg akan diajak chat privat. ambil id nya
    let user = await User.findAll({
      where: { fullname: req.body.fullname }
    });
    let userId = user[0].id;

    //mencari chatroom jika sudah ada
    let chatroom = await Chatroom.findOne({
      where: {
        [Op.or]: [
          { name: req.decoded.id.toString() + " rhs " + userId.toString() },
          { name: userId.toString() + " rhs " + req.decoded.id.toString() }
        ]
      }
    });

    //membuat pesan private
    if (chatroom == null) {
      let addChatroom = await Chatroom.create({
        name: req.decoded.id.toString() + " rhs " + userId.toString()
      });
      let message = await Message.create({
        chatroom_id: addChatroom.id,
        user_id: req.decoded.id,
        content: req.body.content
      });
      res.status(201).json(sucRes(message, "Create new message success"));
    } else {
      let message = await Message.create({
        chatroom_id: chatroom.id,
        user_id: req.decoded.id,
        content: req.body.content
      });
      res.status(201).json(sucRes(message, "Create new message success"));
    }
  } catch (err) {
    res.status(400).json(failRes(err));
  }
}

module.exports = { addMessage, getMySentMessage, addPrivateChat };
