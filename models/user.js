"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      fullname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      lastLogout: DataTypes.DATE
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Message, {
      foreignKey: "user_id",
      as: "message"
    });
  };
  return User;
};
