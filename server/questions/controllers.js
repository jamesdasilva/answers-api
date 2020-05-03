const Question = require('./models');

const questionsController = {};

questionsController.post = (req, res) => {
  const {
    text,
    user,
    likesCount,
    creationDate,
  } = req.body;

  const question = new Question({
    text,
    user,
    likesCount,
    creationDate
  });

  question.save().then((newQuestion) => {
    return res.status(200).json({
      success: true,
      data: newQuestion,
    });
  }).catch((err) => {
    return res.status(500).json({
      message: err
    });
  });
}

questionsController.getAll = (req, res) => {
  Question.find({}).then((questions) => {
    return res.status(200).json({
      success: true,
      data: questions,
    });
  }).catch((err) => {
    return res.status(500).json({
      message: err
    });
  });
}

module.exports = questionsController;