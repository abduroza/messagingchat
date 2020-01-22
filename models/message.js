"use strict";
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      content: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      chatroom_id: DataTypes.INTEGER
    },
    {}
  );
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user"
    });
    Message.belongsTo(models.Chatroom, {
      foreignKey: "chatroom_id",
      as: "chatroom"
    });
  };
  return Message;
};
