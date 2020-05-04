const Question = require('./models').Question;
const Answer = require('./models').Answer;

const createQuestion = require('./use-cases').createQuestion;
const questionIsValid = require('./use-cases').questionIsValid;
const questionHasId = require('./use-cases').questionHasId;

const questionsController = {};

questionsController.post = (req, res) => {
  try {
    if(!questionIsValid(req.body)) throw "O campo 'text' é obrigatório";
    const question = new Question(createQuestion(req.body));
    question.save().then((newQuestion) => {
      return res.status(200).json({
        success: true,
        data: newQuestion,
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    });
  }
}

questionsController.get = (req, res) => {
  try {
    Question
    .findById(req.params.id)
    .then((question) => {
    question.answers.reverse(); 
    return res.status(200).json({
      success: true,
      data: question,
    });
  })
  } catch (err) {
    return res.status(500).json({
      message: err
    });
  };
}

questionsController.put = (req, res) => {
  Question.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((question) => {
    return res.status(200).json({
      success: true,
      data: question
    });
  }).catch((err) => {
    return res.status(500).json({
      message: err
    });
  });
}

questionsController.delete = (req, res) => {
  Question.findByIdAndDelete(req.params.id).then((question) => {
    return res.status(200).json({
      success: true,
      data: question
    });
  }).catch((err) => {
    return res.status(500).json({
      message: err
    });
  });
}

questionsController.getAll = (req, res) => {
  const { q, _sort, _order, _limit, _page} = req.query;

  const query = q ? { "text": { $regex: new RegExp(q), $options: 'i' } } : { };
  const sort = _sort ? _sort : 'creationDate';
  const order = _order ? _order : 'desc';
  const ordination = {};
  ordination[sort] = order;
  const limit = _limit ? Math.abs(_limit) : 2;
  const page = _page ? Math.abs(_page) - 1 : 0;

  Question.countDocuments(query, (err, count) => {
    Question
      .find( query )
      .sort( ordination )
      .limit( limit )
      .skip( limit * page )
      .then((questions) => {
      return res.status(200).json({
        success: true,
        length: count,
        data: questions
      });
    }).catch((err) => {
      return res.status(500).json({
        message: err
      });
    });
  })

}

questionsController.postAnswer = (req, res) => {
  const {
    text,
    user,
    likesCount,
    creationDate
  } = req.body;

  const {
    questionId
  } = req.params;

  const answer = new Answer({
    text,
    user,
    likesCount,
    creationDate
  });

  Question.findByIdAndUpdate(
    questionId, 
    { $push: { "answers": answer } },
    { safe: true, upsert: true, new : true }).then((question) => {
    return res.status(200).json({
      success: true,
      data: question
    });
  }).catch((err) => {
    return res.status(500).json({
      message: err
    });
  });

}

questionsController.putAnswer = (req, res) => {
  const {
    text,
    user,
    likesCount
  } = req.body;

  const {
    questionId,
    answerId
  } = req.params;

  Question.findById(questionId)
  .then((question) => {
    const answers = question.answers.id(answerId);
    answers.likesCount = likesCount || answers.likesCount;
    return question.save();
  }).then((question) => {
    return res.status(200).json({
      success: true,
      data: question.answers.id(answerId)
    });
  }).catch((err) => {
    return res.status(500).json({
      message: err
    });
  });

}


module.exports = questionsController;