const router = require('express').Router();
const { models } = require('../models');
const validateJWT = require("../middleware/jwt-validation");
// const MovieList = require('../models/movieList');

// ***** add movies to list *****

router.post('/favorites', validateJWT, async (req, res) => {

    const {title, year, imdbID, poster, genre, plot} = req.body.movieLists;

    try{
        await models.MovieModel.create({
            title: title,
            year: year,
            imdbID: imdbID,
            poster: poster,
            genre: genre,
            plot: plot,
            userId: req.user.id
        })
        .then(
            MovieList => {
                res.status(201).json({
                    MovieList: MovieList,
                    message: 'movie added to list'
                });
            }
        )
    } catch (err) {
        res.status(500).json({
            error: `Failed to add movie: ${err}`
        });
    };
});

//**** Get all movies by user */

router.get("/favorites/:id", validateJWT, async (req, res) => {
    const {id} = req.params;

    try{
       const userMovies = await models.MovieModel.findAll({
                where: {userId: id}
        })
        
                res.status(201).json(userMovies)
        
    } catch (err) {
        res.status(500).json({
            error: `Failed to retrieve your movies: ${err}`
        })
    }
});




// *** Update Review */

router.put('/update/:id', validateJWT, async (req, res) => {
     const {id} = req.user;
    const {title, year, imdbID, poster, genre, plot} = req.body.movieLists;
    const MovieListId = req.params.id
    try {
        const update = await models.MovieModel.update({
            title: title,
            year: year,
            imdbID: imdbID,
            poster: poster,
            genre: genre,
            plot: plot,
            },
          { where: { userId: id,
                    id: MovieListId}}
            
        )
        res.status(200).json({
            update,
            message: 'movie list updated'
        })
    } catch (err) {
        res.status(500).json({ 
            error: `Failed to update movie list: ${err}`
        })
    }
})

//*** Delete Review */

router.delete("/delete/:id", validateJWT, async (req, res) =>{
    const {id} = req.user;
    const MovieListId = req.params.id;
    
    try {
        await models.MovieModel.destroy(
           { where: {
               userId: id,
            id: MovieListId
            }}
        )
        res.status(200).json({ 
            message: "movie has been deleted"
        })
    } catch (err) {
        res.status(500).json({
            error: `Failed to delete movie: ${err}`
        })
    }
})

module.exports = router;