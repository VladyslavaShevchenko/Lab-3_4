const express = require('express');
const recipe = express.Router();
const recipeService = require('./recipe.service');
const userService = require('../user/user.service');

recipe.route('/')
    .get((req, res) => {
        recipeService.getAllRecipes()
            .then(recipes => {
                res.send(recipes);
            })
            .catch(err => {
                console.log(err);
            });
    })
    .post((req, res) => {
        userService.checkUser(req.body).then((user, err) => {
            if (user != null) {
                recipeService.addRecipe(req.body.recipe)
                    .then(recipe => {
                        res.send(JSON.stringify(recipe));
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                res.sendStatus(400);
                res.send();
            }
        })
    });


recipe.route('/:id')
    .patch((req, res) => {
        userService.checkUser(req.body).then((user, err) => {
            if (user != null) {
                recipeService.updateRecipe(req.params.id, req.body.recipe)
                    .then(recipe => {
                        res.send(recipe);
                    })
                    .catch(err => {
                        console.log(err);
                    });
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
    .get((req, res) => {
        recipeService.getRecipeById(req.params.id)
            .then(recipe => {
                res.send(recipe);
            })
            .catch(err => {
                console.log(err);
            });
    })
    .delete((req, res) => {
        console.log(req.body);
        userService.checkUser(req.body).then((user, err) => {
            if (user != null) {
                recipeService.deleteRecipe(req.params.id)
                    .then(recipe => {
                        res.send(recipe);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                res.sendStatus(400);
                res.send();
            }
        }).catch(err => {
            console.log(err);
            res.sendStatus(400);
            res.send();
        })
    });

module.exports = recipe;
