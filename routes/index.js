const routes = require('express').Router();
const myController = require('../controllers/cards.js');
const path = require('path');
const port = process.env.PORT || 10000;

routes.get('/cards', myController.getAllCards);
routes.get('/cards/:name', myController.getCardByName);

routes.post('/cards', myController.createCard);
routes.put('/cards/:id', myController.updateCard);
routes.delete('/cards/:id', myController.deleteCard);

module.exports = routes;