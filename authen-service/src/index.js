const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan')
const route = require("./app/routes/index.route");
const db = require("../config/dbconfig");
const cors = require("cors");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const globalErrorHandler = require("./app/middle-ware/global-middle-ware").globalErrorHandler

dotenv.config();
const port = process.env.PORT || 3000;
const frontEndHost = process.env.FRONT_END || "http://localhost:8100"
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Authen API Service',
      version: '1.0.0',
      description: 'API documentation for your project',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./src/app/routes/*.js'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use(express.json());
app.use(morgan('combined'));
app.use(cors({
  origin: frontEndHost
}))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
db.connect();
app.use(globalErrorHandler);
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`Swagger host on: http://localhost:${port}/api-docs/`);
})