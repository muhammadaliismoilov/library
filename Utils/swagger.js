const swaggerJsdoc = require("swagger-jsdoc");
// const options = {
//   definition: {
//     openapi: `3.0.0`,
//     info: {
//       title: `Kutubxona loyhasi`,
//       version: `1.0.0`,
//       description: `Bu kutubxona loyhasining dokumentetsiyasi`,
//     },

//   },
//   apis: [`./routes/*.js`],
// };

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Car Management API',
      description: 'Avtomobillarni boshqarish uchun API: autentifikatsiya, kategoriyalar, avtomobillar, profil va admin funksiyalari.',
      version: '1.0.0',
    },
    servers: [
      {
        url:" http://localhost:${process.env.PORT || 4001}",
        description: 'Mahalliy server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.routes.js'], // Barcha marshrut fayllaridagi Swagger kommentariyalarini o‘qish
};
const swaggerDocument = swaggerJsdoc(options);
module.exports = swaggerDocument;
