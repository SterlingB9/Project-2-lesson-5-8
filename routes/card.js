const routes = require('express').Router();
const cards = require('../controllers/cards.js');

routes.get('/', cards.findAll);

module.exports = routes;
