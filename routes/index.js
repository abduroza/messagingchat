const router = require("express").Router();
const userRouter = require("./v1/user");

router.use("/v1/user", userRouter);

module.exports = router;
