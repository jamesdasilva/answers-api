var seeder = require('mongoose-seed');

const Question = require('../server/questions/question-model').Question;
const Answer = require('../server/questions/answer-model').Answer;

var data = [
  {
    "user": "nome1",
    "likesCount": 0,
    "text": "Esta é uma pergunta de teste!",
    "creationDate": "2020-05-05T14:40:38.368Z",
    "answers": [{
        "user": "nostrum resposta",
        "likesCount": 0,
        "text": "resposta de teste 44543 ..."
    }]
  },
  {
    "user": "nome2",
    "likesCount": 0,
    "text": "Esta é uma pergunta de teste!",
    "creationDate": "2020-05-05T14:25:46.903Z",
    "answers": [{
      "user": "teste-name1",
      "likesCount": 0,
      "text": "resposta de teste 44543 ..."
    }, {
      "user": "teste-name2",
      "likesCount": 0,
      "text": "resposta de teste 44543 ..."
    }]
  },
  {
    "user": "nome3",
    "likesCount": 0,
    "text": "Esta é uma pergunta de teste!",
    "creationDate": "2020-05-05T14:24:00.766Z",
    "answers": []
  }
];
 
function createSeed (req, res) { 
  seeder.connect('mongodb://db:27017/desafio-bexs', function() {
    Question.remove({}, function(err) { 
      const models = data.map((item) => new Question(item));
      Promise.all(models.map(item => item.save())).then((result) => {
        return res.status(200).json({
          success: true,
          data: result,
        });
      });
    });
  });
}

function clearSeed (req, res) { 
  seeder.connect('mongodb://db:27017/desafio-bexs', function() {
    Question.remove({}, function(err) { 
      return res.status(200).json({
        success: true,
        message: 'O banco de está vazio',
      });
    });
  });
}

module.exports.createSeed = createSeed;
module.exports.clearSeed = clearSeed;
