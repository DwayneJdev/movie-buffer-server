const router = require('express').Router();
const { models } = require('../models');
const validateJWT = require("../middleware/jwt-validation")

// ***** Create Review *****

router.post('/', validateJWT, async (req, res) => {

    const {title, content} = req.body.review;

    try{
        await models.ReviewModel.create({
            title: title,
            content: content,
            userId: req.user.id
        })
        .then(
            review => {
                res.status(201).json({
                    review: review,
                    message: 'review submitted'
                });
            }
        )
    } catch (err) {
        res.status(500).json({
            error: `Failed to create review: ${err}`
        });
    };
});

//**** Get all reviews by user */

router.get("/:username", validateJWT, async (req, res) => {
    const {username} = req.params;

    try{
       const userReview = await models.ReviewModel.findAll({
            username: username
        })
        
                res.status(201).json(userReview)
        
    } catch (err) {
        res.status(500).json({
            error: `Failed to get review: ${err}`
        })
    }
});


//**** Get all reviews by title */

// router.get("/title/:title", validateJWT, async (req, res) => {
//     const {title} = req.params;

//     try{
//        const titleReview = await models.ReviewModel.findAll({
//             title: title
//         })
        
//                 res.status(201).json(titleReview)
        
//     } catch (err) {
//         res.status(500).json({
//             error: `Failed to get review: ${err}`
//         })
//     }
// });

// *** Update Review */

router.put('/update/:id', validateJWT, async (req, res) => {
     const {id} = req.user;
    const {title, content} = req.body.review;
    const reviewId = req.params.id
    try {
        const update = await models.ReviewModel.update({
            title: title,
            content: content},
          { where: { userId: id,
                    id: reviewId}}
            
        )
        res.status(200).json({
            update,
            message: 'review updated'
        })
    } catch (err) {
        res.status(500).json({ 
            error: `Failed to update review: ${err}`
        })
    }
})

//*** Delete Review */

router.delete("/delete/:id", validateJWT, async (req, res) =>{
    const {id} = req.user;
    const reviewId = req.params.id;
    
    try {
        await models.ReviewModel.destroy(
           { where: {
               userId: id,
            id: reviewId 
            }}
        )
        res.status(200).json({ 
            message: "Review has been deleted"
        })
    } catch (err) {
        res.status(500).json({
            error: `Failed to delete review: ${err}`
        })
    }
})

module.exports = router;