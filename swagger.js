const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API Lesson 5...',
    description: 'Lesson 5'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);