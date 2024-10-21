const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan')
const route = require("./app/routes/index.route");
const db = require("../config/dbconfig");

dotenv.config();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(morgan('combined'));

db.connect();

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})