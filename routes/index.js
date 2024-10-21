const routes = require('express').Router();
const card = require('./card');
const swagger = require('./swagger');

routes.use('/', swagger);
routes.use('/cards', card);
routes.use(
  '/',
  (docData = (req, res) => {
    let docData = {
      documentationURL: 'https://nathanbirch.github.io/nathan-byui-api-docs',
    };
    res.send(docData);
  })
);

module.exports = routes;
