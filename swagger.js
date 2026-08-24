const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
  openapi: "3.0.0",

  info: {
    title: "MERN Authentication API",
    version: "1.0.0",
    description:
      "MERN API with JWT authentication, real-time Socket.IO tasks, and Cloudinary avatar uploads.",
  },

  servers: [
    {
      url: "http://localhost:5000",
      description: "Local server",
    },
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
},
 

  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;