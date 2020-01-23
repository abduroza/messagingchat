const router = require("express").Router();
const chatroomControler = require("../../controllers/chatroomController");
const auth = require("../../middleware/auth");

router.get("/chatroom", chatroomControler.showAllChatroom);
router.get("/messages/new", auth, chatroomControler.showUnreadMessage);
router.get("/:chatroom_id/messages", chatroomControler.showAllMessage);
router.post("/:chatroom_id/messages", auth, chatroomControler.addMessage);

module.exports = router;
