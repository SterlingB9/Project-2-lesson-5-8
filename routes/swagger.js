const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger-output.json');

router.use('/doc', swaggerUi.serve);
router.get('/doc', swaggerUi.setup(swaggerFile));

module.exports = router;