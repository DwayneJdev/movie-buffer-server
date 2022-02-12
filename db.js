const {Sequelize} = require('sequelize');

const seqeulize = new Sequelize(process.env.DATABASE_URL, {
    dialect: process.env.DATABASE_DIALECT
})

module.exports = seqeulize;