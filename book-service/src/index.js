const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan')
const route = require("./app/routes/index.route");
const db = require("../config/dbconfig");
const cors = require("cors");

dotenv.config();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(morgan('combined'));
app.use(cors({
  origin: 'http://localhost:8200'  // Front-end origin
}))

db.connect();

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})