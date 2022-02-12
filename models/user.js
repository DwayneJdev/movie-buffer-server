const { DataTypes } = require("sequelize");
const db = require('../db');

const User = db.define("user", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    required: true,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
  },
  Age: {
      type: DataTypes.INTEGER,
      allowNull: true
  },
  gender: {
      type: DataTypes.STRING,
      allowNull: true

  },
  Bio:{
      type: DataTypes.TEXT(600),
      allowNull: true
  },
  role: {
      type: DataTypes.ENUM('admin', 'member'),
      allowNull: false, 
      defaultValue: "member"
  }
});

module.exports = User;