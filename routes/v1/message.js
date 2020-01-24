const router = require("express").Router();
const messageController = require("../../controllers/messageController");
const auth = require("../../middleware/auth");

router.post("/create", auth, messageController.addMessage);
router.get("/getsent", auth, messageController.getMySentMessage);

module.exports = router;
