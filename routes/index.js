const routes = require('express').Router();
const myController = require('../controllers');
const path = require('path');
const port = process.env.PORT || 10000;

routes.get('/cards', myController.getAllcards);
routes.get('/cards/:card_id', myController.getCardById);

routes.post('/cards', myController.createCard);
routes.put('/cards/:id', myController.updateCard);
routes.delete('/cards/:id', myController.deleteCard);

module.exports = routes;