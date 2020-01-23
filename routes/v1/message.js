const router = require("express").Router();
const messageController = require("../../controllers/messageController");
const auth = require("../../middleware/auth");

router.post("/create", auth, messageController.addMessage);

module.exports = router;
