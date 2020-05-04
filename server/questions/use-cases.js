const createQuestion = (questionAtts) => {
  const _question = { };
  _question.text = questionAtts.text ? questionAtts.text : '';
  _question.user = questionAtts.user ? questionAtts.user : 'anonmous';
  _question.likesCount = 0;
  _question.creationDate = new Date();

  return _question;
}

const questionIsValid = (questionAtts) => !!questionAtts.text;

const questionHasId = (params) => !!params.id;

module.exports.createQuestion = createQuestion;
module.exports.questionIsValid = questionIsValid;
module.exports.questionHasId = questionHasId;