const Question = require('./question-model').Question;
const Answer = require('./answer-model').Answer;

const { createAnswer, alterAnswer } = require('./answers-user-case');

const answersController = {};

answersController.postAnswer = async (req, res) => {
  const { text, user } = req.body;
  const { questionId } = req.params;
  try {
    res.status(200).json({
      success: true,
      data: await createAnswer(questionId, { text, user }, Question, Answer)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error
    });
  }
}

answersController.putAnswer = async (req, res) => {
  const { text, likesCount } = req.body;
  const { questionId, answerId } = req.params;
  try {
    return res.status(200).json({
      success: true,
      data: await alterAnswer(questionId, answerId, { text, likesCount }, Question)
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    });
  }
}

module.exports = answersController;
