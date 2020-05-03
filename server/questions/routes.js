const express = require('express');

const questionsController = require('./controllers');

const questionsRoutes = express();

questionsRoutes.get('/', questionsController.getAll);

questionsRoutes.get('/:id', questionsController.get);

questionsRoutes.post('/', questionsController.post);

questionsRoutes.put('/:id', questionsController.put);

questionsRoutes.delete('/:id', questionsController.delete);

module.exports = questionsRoutes;
