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
  const { q, _sort, _order, _limit, _page} = req.query;

  const query = q ? { "text": { $regex: new RegExp(q), $options: 'i' } } : { };
  const sort = _sort ? _sort : 'creationDate';
  const order = _order ? _order : 'desc';
  const ordination = {}[sort] = order;
  const limit = _limit ? Math.abs(_limit) : 2;
  const page = _page ? _page : 0;

  Question
    .find( query )
    .sort( ordination )
    .limit( limit )
    .skip( limit * page )
    .then((questions) => {
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