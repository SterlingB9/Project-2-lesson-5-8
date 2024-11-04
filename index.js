const express = require('express');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const { initDb } = require('./db/connect');

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/', require('./routes'))
  .use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

const PORT = process.env.PORT || 8080;

// Initialize the database and start the server only after a successful connection
initDb((err) => {
  if (err) {
    console.error('Failed to connect to database:', err);
    process.exit(1); // Exit if the DB connection fails
  } else {
    console.log('Connected to the database!');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  }
});