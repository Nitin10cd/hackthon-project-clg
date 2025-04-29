import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  classroom: {
    type: Schema.Types.ObjectId,
    ref: 'Classroom', 
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  timeDuration: {
    type: Number, 
    required: true,
  },
  questions: [{
    name: { type: String, required: true },
    optionA: { type: String, required: true },
    optionB: { type: String, required: true },
    optionC: { type: String, required: true },
    optionD: { type: String, required: true },
    answer: { type: String, required: true },
  }],
  submissions: [{
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    marks: {
      type: Number,
    }
  }]
});

const Test = mongoose.model('Test', TestSchema);
export default Test;
