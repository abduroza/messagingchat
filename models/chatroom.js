"use strict";
module.exports = (sequelize, DataTypes) => {
  const Chatroom = sequelize.define(
    "Chatroom",
    {
      name: DataTypes.STRING
    },
    {}
  );
  Chatroom.associate = function(models) {
    // associations can be defined here
    Chatroom.hasMany(models.Message, {
      foreignKey: "chatroom_id",
      as: "message"
    });
  };
  return Chatroom;
};
