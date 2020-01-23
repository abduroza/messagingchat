const Message = require("../models").Message;
const Chatroom = require("../models").Chatroom;
const { sucRes, failRes } = require("../helper/resFormat");

async function addMessage(req, res, next) {
  try {
    let chatroom = await Chatroom.findAll({
      where: { name: req.body.name }
    });

    let chatroom_id = chatroom[0].id;
    console.log({ chatroom: chatroom });
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

module.exports = { addMessage };
