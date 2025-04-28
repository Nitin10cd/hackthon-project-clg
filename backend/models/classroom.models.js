import mongoose, { mongo } from "mongoose";

const classroomSchema = new mongoose.Schema({
    name: {
        type: String,
        requried: true
    },
    subject: {
        type: String,
        requried: true,
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    student: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    ],
    posts: [
       {
         type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
       }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ClassroomModel = mongoose.model('Classroom', classroomSchema);
export default ClassroomModel;