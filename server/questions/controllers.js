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

questionsController.get = (req, res) => {
  Question.findById(req.params.id).then((question) => {
    return res.status(200).json({
      success: true,
      data: question,
    });
  }).catch((err) => {
    return res.status(500).json({
      message: err
    });
  });
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
  const query = req.query.q ? { "text": { $regex: new RegExp(req.query.q), $options: 'i' } } : { };
  Question.find(query).then((questions) => {
    return res.status(200).json({
      success: true,
      data: questions
    });
  }).catch((err) => {
    return res.status(500).json({
      message: err
    });
  });
}

module.exports = questionsController;