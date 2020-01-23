const router = require("express").Router();
const chatroomControler = require("../../controllers/chatroomController");
const auth = require("../../middleware/auth");

router.get("/show", chatroomControler.showAllChatroom);
router.get("/messages/new", auth, chatroomControler.showUnreadMessage);
router.get("/:chatroom_id/messages", chatroomControler.showAllMessage);
router.post("/create", auth, chatroomControler.createRoom);

module.exports = router;
