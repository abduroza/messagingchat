const User = require("../models/").User;
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
      fullname: data.fullname,
      email: data.email
    };

    res.status(201).json(sucRes(result, "Register New User Success"));
  } catch (err) {
    res.status(422).json(failRes(err.message, "please fill correctly"));
  }
}

async function login(req, res) {
  let user = await User.findOne({
    where: {
      email: req.body.email
    }
  });

  if (!user) {
    return res.status(404).json(failRes("Email Not Found"));
  } else {
    try {
      let result = await bcrypt.compare(req.body.password, user.password);
      if (result == true) {
        let token = await jwt.sign(
          {
            id: user.id,
            email: user.email,
            lastLogout: user.lastLogout
          },
          process.env.TOKEN_SECRET
        );
        let dataLogin = {
          _id: user._id,
          fullname: user.fullname,
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

// DELETE request to logout user

async function remove(req, res, next) {
  let update = await req.user.update({ lastLogout: Date.now() });
  let logout = await req.logOut();
  res.status(204).json(sucRes(update, "You are logout"));
}
module.exports = { register, login, remove };
