const db = require('../db');

const UsersModel = require('./user');
const MovieModel = require('./movieList');
const ReviewModel = require('./reviews');

UsersModel.hasMany(ReviewModel);
UsersModel.hasMany(MovieModel);

ReviewModel.belongsTo(UsersModel);
MovieModel.belongsTo(UsersModel);


module.exports = {
    dbConnection: db,
    models: {
        UsersModel,
        MovieModel,
        ReviewModel
    }
};