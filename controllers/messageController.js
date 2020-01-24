const Message = require("../models").Message;
const Chatroom = require("../models").Chatroom;
const { sucRes, failRes } = require("../helper/resFormat");

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

module.exports = { addMessage, getMySentMessage };
