const jwt = require("jsonwebtoken");
const { sucRes, failRes } = require("../helper/resFormat");
const User = require("../models/").User;

async function authLogin(req, res, next) {
  let bearerToken = await req.headers.authorization;
  if (!bearerToken) return res.status(401).json(failRes("No token provided"));
  let splitToken = bearerToken.split(" ");
  try {
    let decoded = await jwt.verify(splitToken[1], process.env.TOKEN_SECRET);
    req.decoded = decoded;
    let user = await User.findByPk(req.decoded.id);
    if (!user)
      return res.status(410).json(failRes("User Gone due to Already Deleted"));
    next();
  } catch (err) {
    res.status(401).json(failRes("Invalid Token"));
  }
}

module.exports = authLogin;
