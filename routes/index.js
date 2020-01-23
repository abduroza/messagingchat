const router = require("express").Router();
const userRouter = require("./v1/user");
const chatroomRouter = require("./v1/chatroom");

router.use("/v1/user", userRouter);
router.use("/v1/chatroom", chatroomRouter);

module.exports = router;
