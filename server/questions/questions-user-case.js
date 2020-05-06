const createQuestion = async (questionAtts, Question) => {
  const _question = { };
  _question.text = questionAtts.text ? questionAtts.text : '';
  _question.user = questionAtts.user ? questionAtts.user : 'anonymous';
  _question.likesCount = 0;
  _question.creationDate = new Date();

  if(!questionAtts.text) throw "O campo 'text' é obrigatório";
  const question = new Question(_question);
  question.save();

  return question;
}

const queryQuestions = async (params, Question) => {
  const { q, _sort, _order, _limit, _page} = params;

  const query = q ? { "text": { $regex: new RegExp(q), $options: 'i' } } : { };
  const sort = _sort ? _sort : 'creationDate';
  const order = _order ? _order : 'desc';
  const ordination = {};
  ordination[sort] = order;
  const limit = _limit ? Math.abs(_limit) : 2;
  const page = _page ? Math.abs(_page) - 1 : 0;

  return Question
    .find( query )
    .sort( ordination )
    .limit( limit )
    .skip( limit * page );
}

module.exports.createQuestion = createQuestion;
module.exports.queryQuestions = queryQuestions;