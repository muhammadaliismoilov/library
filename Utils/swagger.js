const { version } = require("joi");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: `3.0.0`,
    info: {
      title: `Kutubxona loyhasi`,
      version: `1.0.0`,
      description:`Bu kutubxona loyhasining dokumentetsiyasi`
    },
  },
  apis: [`./routes/*.js`],
};
const swaggerDocument = swaggerJsdoc(options);
module.exports = swaggerDocument;
