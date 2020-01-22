const User = require("../models/user");
const { sucRes, failRes } = require("../helper/resFormat");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

async function register(req, res) {
  try {
    let hash = await bcrypt.hash(req.body.password, saltRounds);
    let data = await User.create({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hash
    });

    let result = {
      _id: data._id,
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      email: data.email,
      role: data.role,
      token: token
    };

    res.status(201).json(sucRes(result, "Register New User Success"));
  } catch (err) {
    res.status(422).json(failRes(err.message, "please fill correctly"));
  }
}

async function login(req, res) {
  let user = await User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }]
  });

  if (!user) {
    return res.status(404).json(failRes("Username or Email Not Found"));
  } else {
    try {
      let result = await bcrypt.compare(req.body.password, user.password);
      if (result == true) {
        let token = await jwt.sign(
          {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
          },
          process.env.TOKEN_SECRET
        );

        let dataLogin = {
          _id: user._id,
          role: user.role,
          username: user.username,
          email: user.email,
          token: token
        };
        res.status(200).json(sucRes(dataLogin, "Login Success"));
      }
    } catch (err) {
      res.status(404).json(failRes(err, "Invalid Password"));
    }
  }
}

module.exports = { register, login };
