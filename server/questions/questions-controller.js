const Question = require('./question-model').Question;

const { createQuestion, queryQuestions } = require('./questions-user-case');

const questionsController = { };

questionsController.post = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: await createQuestion(req.body, Question)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error
    });
  }
}

questionsController.get = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: await Question
        .findById(req.params.id)
        .then((question) => {
          question.answers.reverse();
          return question;
        })
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err
    });
  };
}

questionsController.put = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: await Question.findByIdAndUpdate(req.params.id, req.body, { new: true })
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error
    });
  }
}

questionsController.delete = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: await Question.findByIdAndDelete(req.params.id)
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: error
    });
  }
}

questionsController.getAll = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      length: await Question.count({}),
      data: await queryQuestions(req.query, Question)
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
}

module.exports = questionsController;
