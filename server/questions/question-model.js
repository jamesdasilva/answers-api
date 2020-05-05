const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = require('./answer-model').answerSchema;

const questionSchema = new Schema({
  text: { type: String, required: true },
  user: { type: String, default: 'anonymous' },
  likesCount: { type: Number, default: 0 },
  creationDate: { type: Date, default: Date.now },
  answers: [answerSchema]
});
  
const Question = mongoose.model('Question', questionSchema);

module.exports.Question = Question;