const express = require('express');
const user = express.Router();
const userService = require('./user.service');

user.route('/')
    .post((req, res) => {
        userService.checkUser(req.body).then((user, err) => {
            if (user != null) {
                res.send(JSON.stringify(user));
            } else {
                res.sendStatus(400);
                res.send();
            }
        }).catch(err => {
            console.log(err);
            res.sendStatus(400);
            res.send();
        })
    })
    .put((req, res) => {
        userService.addUser(req.body)
            .then(user => {
                res.send(user);
            }).catch(err => {
                console.log(err);
                res.sendStatus(400);
                res.send();
            });
    });
user.route('/liked')
    .post((req, res) => {
        userService.getLiked(req.body)
            .then(liked => {
                res.send(liked);
            })
            .catch(err => {
                console.log(err);
            });
    })
    .put((req, res) => {
        userService.checkUser(req.body).then((user, e) => {
            if (user != null) {
                console.log(user.liked);
                if (user.liked.includes(req.body.recipeId)) {
                    userService.deleteLiked(user._id, req.body.recipeId)
                        .then(() => {
                            res.send();
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else {
                    userService.addLiked(user._id, req.body.recipeId)
                        .then(() => {
                            res.send();
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }

            } else {
                res.sendStatus(400);
                res.send();
            }
        }).catch(err => { console.log(err) });

    })

module.exports = user;
