const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const questionsRoutes = require('./questions/routes');

const DBURI = 'mongodb://db:27017/desafio-bexs';
const DBOptions = {
  useNewUrlParser: true
};

mongoose
  .connect(DBURI, DBOptions, () => {
    console.log('Conectando ao MongoDB...');
  })
  .then(() => {
    console.log('MongoDB Conectado');
  })
  .catch(error => {
    console.log(error);
  });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', questionsRoutes);

app.get('/', (req, res) => {
  res.send('executando...');
});

module.exports = app;
