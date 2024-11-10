const routes = require('express').Router();
const myController = require('../controllers/cards.js');
const path = require('path');
const port = process.env.PORT || 10000;
const { validateManaCost, validate } = require('./../controllers/cards.js');

routes.get('/cards', myController.getAll);
routes.get('/cards/:name', myController.getCard);

routes.post('/cards', validateManaCost(), validate, myController.createCard);
routes.put('/cards/:id', validateManaCost(), validate, myController.updateCard);
routes.delete('/cards/:name', myController.deleteCard);

module.exports = routes;