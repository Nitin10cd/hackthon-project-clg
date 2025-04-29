import mongoose from "mongoose";
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  options: {
    a: { type: String, required: true },
    b: { type: String, required: true },
    c: { type: String, required: true },
    d: { type: String, required: true }
  },
  answer: {
    type: String,
    required: true, 
  },
  test: {
    type: Schema.Types.ObjectId,
    ref: 'Test', 
    required: true
  }
});

const Question = mongoose.model('Question', QuestionSchema);
export default Question;
