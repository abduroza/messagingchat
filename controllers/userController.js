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
      id: data.id,
      fullname: data.fullname,
      email: data.email
    };

    res.status(201).json(sucRes(result, "Register New User Success"));
  } catch (err) {
    res.status(422).json(failRes(err, "please fill correctly"));
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
            fullname: user.fullname,
            email: user.email,
            lastLogout: user.lastLogout
          },
          process.env.TOKEN_SECRET
        );
        let dataLogin = {
          id: user.id,
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

//get all user
async function getAllUser(req, res) {
  let user = await User.findAll();
  res.status(200).json(sucRes(user, "Show all user"));
}
//get me
async function getMe(req, res) {
  let user = await User.findByPk(req.decoded.id);
  let me = {
    id: user.id,
    fullname: user.fullname,
    email: user.email,
    lastLogout: user.lastLogout,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
  res.status(200).json(sucRes(me, "Your profile"));
}

// DELETE request to logout user
async function logout(req, res) {
  let update = await User.update(
    { lastLogout: Date.now() },
    { where: { id: req.decoded.id } }
  );
  let logout = await req.logOut();
  res.status(204).json(sucRes(update, "You are logout"));
}

//delete user, without delete messsage
async function removeUser(req, res) {
  let destroyUser = await User.destroy({ where: { id: req.decoded.id } });
  res
    .status(200)
    .json(sucRes(destroyUser, `${req.decoded.fullname} user success deleted`));
}

module.exports = { register, login, removeUser, getAllUser, getMe };
