const router = require('express').Router();
const { models } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize/lib/errors');


router.post('/signup', async (req, res) => {
    const {username, password, email, role} = req.body.user;
    try {
        await models.UsersModel.create({
            username: username,
            password: bcrypt.hashSync(password, 10),
            email: email,
            role: role
           
        })
        .then(
            user => {
                let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                res.status(201).json({
                    user: user,
                    message: 'user successfully created',
                    sessionToken: `Bearer ${token}`
                });
            }
        )
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: 'Username already in use'
            });
        } else {
            res.status(500).json({
                error: `Failed to register user: ${err}`
            });
        };
    };
});

router.post('/login', async (req, res) => {

    const {username, password } = req.body.user;

    try {
        await models.UsersModel.findOne({
            where: {
                username: username
            }
        })
        .then(
            user => {
                if (user) {
                    bcrypt.compare(password, user.password, (err, matches) => {
                        if (matches) {
                            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
                            res.json({
                                user: user,
                                message: 'successful login',
                                sessionToken: `Bearer ${token}`
                            })
                        } else {
                            res.status(401).send({
                                message: 'wrong email or password'
                            })
                        }
                    })
                } else {
                    res.status(401).send({
                        message: 'wrong email or password'
                    })
                }
            }
        )
    } catch (err) {
        res.status(500).send({
            message: 'failed to login',
            error: err
        })
    }
})

module.exports = router;