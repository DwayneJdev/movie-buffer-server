const { DataTypes } = require("sequelize");
const db = require('../db');

const review = db.define("review", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        required: true,
      }

})


module.exports = review;