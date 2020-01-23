const router = require("express").Router();
const userRouter = require("./v1/user");
const chatroomRouter = require("./v1/chatroom");
const messageRouter = require("./v1/message");

router.use("/v1/user", userRouter);
router.use("/v1/chatroom", chatroomRouter);
router.use("/v1/message", messageRouter);

module.exports = router;
