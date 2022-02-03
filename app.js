require('dotenv').config();
const express = require('express');
const app = express();
const dbConnection = require('./db');
const controllers  = require('./controllers');
const middleware = require('./middleware');

app.use(express.json());

// endpoints
app.use('/user', controllers.userscontroller);
app.use(middleware.jwtValidation);
app.use('/review', controllers.reviewController);
app.use('/movies', controllers.movieController);

// database auth & sync
try {
    dbConnection
        .authenticate()
        .then(async () => await dbConnection.sync( /* {force: true} */ ))
        .then(() => {
            app.listen(process.env.PORT, () => {
                console.log(`[SERVER]: App is listening on ${process.env.PORT}`);
            });
        });
} catch (err) {
    console.log('[SERVER]: Server crashed');
    console.log(err);
}
