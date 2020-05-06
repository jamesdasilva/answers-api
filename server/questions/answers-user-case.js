async function createAnswer(questionId, answersAtts, Question, Answer) {
  if(!answersAtts.text) throw new Error("O atributo 'text' é obrigatório");
  const answer = new Answer({
    text: answersAtts.text,
    user: answersAtts.user || 'anonymous',
    likesCount: 0
  });
  return Question.findByIdAndUpdate(
    questionId, 
    { $push: { "answers": answer } },
    { safe: true, upsert: true, new : true });
}

async function alterAnswer(questionId, answerId, answersAtts, Question) {
  const { likesCount } = answersAtts;
  const _question = await Question.findById(questionId)
  const answers = _question.answers.id(answerId);
  if(likesCount < answers.likesCount) throw "O valor de 'likesCount' não pode diminuir";
  answers.likesCount = likesCount || answers.likesCount;
  _question.save();
  return _question;
}

module.exports.createAnswer = createAnswer;
module.exports.alterAnswer = alterAnswer;
