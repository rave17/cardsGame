// configura express
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./backend/routes/routes');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/bonsgame', routes);

module.exports = app;