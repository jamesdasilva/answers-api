const mongoose = require('mongoose');

const Question = require('../server/questions/question-model').Question;
const Answer = require('../server/questions/answer-model').Answer;

const DBURI = 'mongodb://db:27017/desafio-bexs';
const DBOptions = {
  useNewUrlParser: true
};

var data = [
  {
    "user": "user1",
    "likesCount": 0,
    "text": "Esta é uma pergunta de teste!",
    "creationDate": "2020-02-05T14:40:38.368Z",
    "answers": [{
        "user": "user5",
        "likesCount": 0,
        "text": "Esta é uma resposta de teste.",
        "creationDate": "2020-02-08T14:40:38.368Z",
    }]
  },
  {
    "user": "user2",
    "likesCount": 0,
    "text": "Esta é uma pergunta de teste!",
    "creationDate": "2020-05-07T14:25:46.903Z",
    "answers": [{
      "user": "user1",
      "likesCount": 0,
      "text": "Esta é uma resposta de teste.",
      "creationDate": "2020-05-09T14:25:46.903Z"
    }, {
      "user": "user1",
      "likesCount": 0,
      "text": "Esta é uma resposta de teste.",
      "creationDate": "2020-06-09T14:24:00.766Z"
    }]
  },
  {
    "user": "user3",
    "likesCount": 0,
    "text": "Esta é uma resposta de teste.",
    "creationDate": "2020-01-09T14:24:00.766Z",
    "answers": []
  }
];
 
function createSeed (req, res) { 
  mongoose.connect(DBURI, DBOptions, function() {
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
  mongoose.connect(DBURI, DBOptions, function() {
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
