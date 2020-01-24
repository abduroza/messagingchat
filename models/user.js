"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      fullname: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: { args: 5, msg: "password min 5 charachter" },
          max: 1000
        }
      },
      lastLogout: { type: DataTypes.DATE, devaultValue: null }
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
