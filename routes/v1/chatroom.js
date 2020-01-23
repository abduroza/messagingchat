const router = require("express").Router();
const chatroomControler = require("../../controllers/chatroomController");

router.get("/chatroom", chatroomControler.showAllChatroom);
router.get("/messages/new", chatroomControler.showUnreadMessage);
router.get("/:chatroom_id/messages", chatroomControler.showAllMessage);

module.exports = router;
