import mongoose from 'mongoose';

const attachmentSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        enum: ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'audio', 'video' ,'png' , 'jpg' , 'jpeg'],
        required: true
    },
    fileName: {
        type: String,
        required: true
    }
});


const commentSchema = new mongoose.Schema({
    commenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Main Post Schema
const postSchema = new mongoose.Schema({
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    title: {
        type: String
    },
    content: {
        type: String 
    },
    attachments: [attachmentSchema], 
    reactions: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                refPath: 'reactions.userModel'
            },
            userModel: {
                type: String,
                enum: ['Teacher', 'Student']
            },
            type: {
                type: String,
                enum: ['like', 'love', 'insightful'],
                default: 'like'
            }
        }
    ],
    comments: [commentSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const PostModel = mongoose.model('Post', postSchema);
export default PostModel;
