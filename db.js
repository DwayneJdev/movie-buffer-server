const {Sequelize} = require('sequelize');

const seqeulize = new Sequelize(process.env.DATABASE_URL, 
    
    process.env.HOST === 'local' ? {
        dialect: process.env.DATABASE_DIALECT,
    
      }
        :
        {
            dialect: process.env.DATABASE_DIALECT,
          dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false
            }
          }
        }
)

module.exports = seqeulize;