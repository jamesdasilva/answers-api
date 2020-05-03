const express = require('express');

const questionsController = require('./controllers');

const questionsRoutes = express();

questionsRoutes.get('/', (req, res) => {
  res.json({ "req": "Não tem" });
});

questionsRoutes.get('/:id', (req, res) => {
  res.json({ "req": "Não tem" });
});

questionsRoutes.post('/', questionsController.post);

questionsRoutes.put('/:id', (req, res) => {
  res.json({ "req": req.body });
});

module.exports = questionsRoutes;
