const mongoose = require('mongoose');
require('dotenv').config();
const DB_HOST = process.env.DB_HOSTNAME || 'localhost';
const DB_PORT = process.env.DB_PORT || "27017";
const DB_NAME = process.env.DB_NAME || "mdp_products";
const CONN_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

mongoose.connect(CONN_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then((db) => console.log('DB connected!'))
.catch((err) => console.error(err))
